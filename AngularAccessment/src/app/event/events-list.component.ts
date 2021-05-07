import { Component, OnInit } from '@angular/core';
import { IEventModel } from './events-model';
import { ScheduleService } from '../service/schedule.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { concatMap, filter } from 'rxjs/operators';
import { interval } from 'rxjs';


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
    start = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours());
    events: IEventModel[];
    event: IEventModel;

    constructor(private scheduleService: ScheduleService, private matDialog: MatDialog) {
        this.events = <IEventModel[]>[];
        this.event = <IEventModel>{};
    }

    ngOnInit() {
        const reloadInterval = interval(10000); // Reload event list every 10 sec

        this.search(this.start, this.end);
        reloadInterval.subscribe(val => this.search(this.start, this.end));
    }

    openDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = `500px`;
        dialogConfig.data = {eventModel: this.event, title: 'Add New Event'};
        const dialogRef =  this.matDialog.open(DialogBodyComponent, dialogConfig);

        dialogRef.afterClosed().pipe(
            filter(result => result),
            concatMap( result => this.scheduleService.createEvent(this.scheduleService.processEventData(result)))
        ).subscribe(next => {if (next) {this.search(this.start, this.end); }} );
    }

    search(start: Date, end: Date) {
        this.start = start;
        this.end = end;
        this.scheduleService.getEventList(new Date(start), new Date(end)).subscribe(events => {
            this.events = events;
        });
    }

    reload(msg: any) {
        this.search(this.start, this.end);
    }
}
