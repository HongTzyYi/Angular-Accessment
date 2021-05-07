import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEventModel, IEditEvent } from './events-model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ScheduleService } from '../service/schedule.service';
import { map, filter, concatMap } from 'rxjs/operators';

@Component({
    selector: 'events-detail',
    templateUrl: `events-detail.component.html`,
    styles: [`
    .thumbnail { min-height: 300px; }
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }`]
})

export class EventsDetailComponent {
    @Input() event: IEventModel;
    @Output() reloadEvent = new EventEmitter();

    constructor(private scheduleService: ScheduleService, private matDialog: MatDialog) {}

    deleteRecord() {
        if (this.event.event) {
            this.scheduleService.deleteEvent(this.event.event)
        .subscribe(next => {}, error => {}, () => { this.reloadEvent.emit('reload'); });
        }
    }

    openDialog() {
        let editEvent = <IEditEvent>{};
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = `500px`;
        dialogConfig.data = {eventModel: this.event, title: 'Edit Event', type: 'EDIT'};
        const dialogRef =  this.matDialog.open(DialogBodyComponent, dialogConfig);

        dialogRef.afterClosed().pipe(
            filter(result => result),
            map(result => {
                if (result) {
                    editEvent['start:dateTime'] =  new Date(result.start).toISOString();
                    editEvent['end:dateTime'] = new Date(result.end).toISOString();
                }
            }),
            concatMap(() => this.scheduleService.editEvent(this.event.event || '', editEvent))
        ).subscribe( () => {this.reloadEvent.emit('reload'); });
    }
}
