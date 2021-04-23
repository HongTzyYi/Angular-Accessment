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
<<<<<<< HEAD
        this.eventService.getEventList().subscribe(events => {
            console.log(events);
            this.events = events;
        });
=======
        this.eventService.getEventList().subscribe({next: events => this.events = events} )
        console.log(this.events);
>>>>>>> 884cbb9def3961a2fee380b3f8f2e63b31dcd1a1
    }
}
