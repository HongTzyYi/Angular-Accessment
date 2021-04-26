import { Component, OnInit } from '@angular/core';
import { IEventModel } from './events-model';
import { ScheduleService } from '../service/schedule.service';
import { map, tap } from 'rxjs/operators';
import { __assign } from 'tslib';

@Component({
    selector: 'events-list',
    templateUrl: `events-list.component.html`
})

export class EventsListComponent implements OnInit {
    end = new Date();
    start = new Date(new Date().setDate(this.end.getDate() - 1));
    events: IEventModel[];
    constructor(private eventService: ScheduleService) {}

    ngOnInit(){
        this.eventService.getEventList(this.start, this.end).subscribe(events => {
            console.log(events);
            this.events = events;
        });
    }
}
