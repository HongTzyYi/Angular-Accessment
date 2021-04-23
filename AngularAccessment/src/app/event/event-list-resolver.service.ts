import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ScheduleService } from '../service/schedule.service';
import { map } from 'rxjs/operators';

@Injectable()
export class EventListResolver implements Resolve<any> {
  constructor(private eventService: ScheduleService) {
  }

  resolve() {
    return this.eventService.getEventList().pipe(
      map(events => events)
    );
  }
}
