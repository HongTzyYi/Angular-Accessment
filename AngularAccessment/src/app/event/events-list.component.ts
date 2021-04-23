import { Component, OnInit } from '@angular/core';
import { IEventModel } from './events-model';
import { ScheduleService } from '../service/schedule.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { __assign } from 'tslib';

@Component({
    selector: 'events-list',
    templateUrl: `events-list.component.html`
})

export class EventsListComponent implements OnInit{
    events: IEventModel[];
    constructor(private eventService: ScheduleService, private route: ActivatedRoute){}

    ngOnInit(){
        this.eventService.getEventList().subscribe(events => {
            console.log(events);
            this.events = events;
        });
    }
}
