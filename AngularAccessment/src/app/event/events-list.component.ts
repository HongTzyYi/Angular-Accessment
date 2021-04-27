import { Component, OnInit } from '@angular/core';
import { IEventModel } from './events-model';
import { ScheduleService } from '../service/schedule.service';


@Component({
    selector: 'events-list',
    templateUrl: `events-list.component.html`
})

export class EventsListComponent implements OnInit {
    end = new Date();
    start = new Date(this.end.getFullYear(), this.end.getMonth(), this.end.getDate(), 0, 0, 0, 0);
    events: IEventModel[];
    constructor(private eventService: ScheduleService) {}

    ngOnInit() {
        this.eventService.getEventList(this.start, this.end).subscribe(events => {
            this.events = events;
        });
    }
}
