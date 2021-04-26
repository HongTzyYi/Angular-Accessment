// Service containing API wrapper from scs schedule API
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
      return event;
  }

  public getEventList(start: Date, end: Date, channels?: string[]): Observable<IEventModel[]> {
    let url = `/api/v1/store/schedule/events?startTime=${start.toISOString()}&endTime=${end.toISOString()}`;
    console.log(url);
    if (channels && channels.length > 0) {
      channels.forEach(c => url = `${url}&channels=${c}`);
    }
    return this.httpClient.get<IEventModel[]>(url, {responseType: 'json'}).pipe(
      map(data => data.map(
        event => ScheduleService.normalizeEvent(event)
      ))
    );
  }

  getEvent(eventID: string) {
    return this.httpClient.get<IEventModel[]>('/api/v1/store/schedule/events' + eventID, {responseType: 'json'}).pipe(
      map(data => data.map(
        event => ScheduleService.normalizeEvent(event)
      ))
    );
  }

  createEvent(event: IEventModel) {
    return this.httpClient.post('/api/v1/store/schedule/events', event);
  }

  editEvent(EventID: string, event: IEventModel) {
    return this.httpClient.post('/api/v1/store/schedule/events/' + EventID, event);
  }

  deleteEvent(EventID: string) {
    return this.httpClient.delete('/api/v1/store/schedule/events/' + EventID);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }


}
