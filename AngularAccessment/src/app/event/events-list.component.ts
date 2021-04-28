import { Component, OnInit } from '@angular/core';
import { IEventModel } from './events-model';
import { ScheduleService } from '../service/schedule.service';


@Component({
    selector: 'events-list',
    templateUrl: `events-list.component.html`
})

export class EventsListComponent implements OnInit {
    end = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 99);
    start = new Date(this.end.getFullYear(), this.end.getMonth(), this.end.getDate(), this.end.getHours() - 6, 0, 0, 0);
    events: IEventModel[];
    constructor(private eventService: ScheduleService) {}

    ngOnInit() {
        this.eventService.getEventList(this.start, this.end).subscribe(events => {
            this.events = events;
        });
    }
}
