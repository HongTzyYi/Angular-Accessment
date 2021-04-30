import { Component, OnInit } from '@angular/core';
import { IEventModel, IEditEvent } from './events-model';
import { ScheduleService } from '../service/schedule.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { map } from 'rxjs/operators';


@Component({
    selector: 'events-list',
    templateUrl: `events-list.component.html`,
    styles: [`
    .thumbnail { min-height: 280px; }
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
    #addEvent {font-size: 15px; text-align: center; float: right;}
    `]
})

export class EventsListComponent implements OnInit {
    end = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 99);
    start = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours() - 1);
    events: IEventModel[];
    event: IEventModel;
    constructor(private scheduleService: ScheduleService, private matDialog: MatDialog) {}

    ngOnInit() {
        this.scheduleService.getEventList(this.start, this.end).subscribe(events => {
            this.events = events;
        });
    }

    openDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = `500px`;
        dialogConfig.data = {eventModel: this.event, title: 'Add New Event'};
        const dialogRef =  this.matDialog.open(DialogBodyComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.scheduleService.createEvent(this.scheduleService.processEventData(result))
            .subscribe(
                next => {
                    if (next) { window.location.reload(); }
                }
            );
            }
        });
    }

}
