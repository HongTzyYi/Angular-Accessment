import { Component, Input } from '@angular/core';
import { IEventModel, IEditEvent } from './events-model';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ScheduleService } from '../service/schedule.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'events-thumbnail',
    templateUrl: `events-thumbnail.component.html`,
    styles: [`
    .thumbnail { min-height: 300px; }
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }`]
})

export class EventsThumbnailComponent {
    @Input() event: IEventModel;
    

    constructor(private scheduleService: ScheduleService, private matDialog: MatDialog) {}

    // placeholder function to API service
    startRecord() {}

    deleteRecord() {
        this.scheduleService.deleteEvent(this.event.event || '')
        .subscribe(next => {}, error => {}, () => { window.location.reload(); });
    }

    openDialog() {
        let editEvent = <IEditEvent>{};
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = `500px`;
        dialogConfig.data = {eventModel: this.event, title: 'Edit Event', type: 'EDIT'};
        const dialogRef =  this.matDialog.open(DialogBodyComponent, dialogConfig);

        dialogRef.afterClosed().pipe(
            map(result => {
                if (result) {
                    editEvent['start:dateTime'] =  new Date(result.start).toISOString();
                    editEvent['end:dateTime'] = new Date(result.end).toISOString();
                }
            })
        ).subscribe(result => {
            console.log(editEvent);
            if (editEvent['start:dateTime'] && editEvent['end:dateTime']) {
                this.scheduleService.editEvent(this.event.event || '', editEvent)
                .subscribe();
            }
        });
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
          return of(result as T);
        };
      }
}
