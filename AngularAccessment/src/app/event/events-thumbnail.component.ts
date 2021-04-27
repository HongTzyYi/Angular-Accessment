import { Component, Input } from '@angular/core';
import { IEventModel } from './events-model';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ScheduleService } from '../service/schedule.service';
import { Observable, of } from 'rxjs';

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
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = `500px`;
        dialogConfig.data = {eventModel: this.event};
        const dialogRef =  this.matDialog.open(DialogBodyComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`event details dialog closed`);
            console.log(result);
            this.scheduleService.editEvent(this.event.event || '', this.scheduleService.processEventData(result))
            .subscribe();
        });
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
          return of(result as T);
        }
      }
}
