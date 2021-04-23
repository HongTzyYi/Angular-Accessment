// Service containing API wrapper from scs schedule API
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEventModel, EventStatus, EventType } from '../event/events-model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EventsListComponent } from '../event/events-index';

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {

  constructor( private httpClient: HttpClient ) { }

  public static normalizeEvent(jsonObject: any): IEventModel {
      let event = <IEventModel>{};
      if (!jsonObject) { return event; }

      event = <IEventModel>Object.assign(jsonObject);
      event['start:dateTime'] = new Date(jsonObject['start:dateTime']);
      event['end:dateTime'] = new Date(jsonObject['end:dateTime']);
      /* event['status:enum'] = ScheduleService.normalizeEnum(EventStatus, jsonObject['status:enum']);
      event['type:enum'] = ScheduleService.normalizeEnum(EventType, jsonObject['type:enum']); */
      return event;
  }

  /* private static normalizeEnum<T>(enumType: T, value: any): T {
    return typeof value === 'string' ?  enumType[value] : value;
  } */

  public getEventList(): Observable<IEventModel[]> {
    /* return EventList; */
    return this.httpClient.get<IEventModel[]>('/api/v1/store/schedule/events', {responseType: 'json'}).pipe(
      map(data => data.map(
        event => ScheduleService.normalizeEvent(event)
      ))
    );
  }

  getEvent(){}

  createEvent(){}

  editEvent(){}

  deleteEvent(){}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }


}
