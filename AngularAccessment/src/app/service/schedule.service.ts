// Service containing API wrapper from scs schedule API
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IEventModel, EventStatus, EventType, IAddEvent } from '../event/events-model';
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
    event.start = new Date(jsonObject.start);
    event.end = new Date(jsonObject.end);
    event.event = jsonObject[`event:id`];
    event.name = jsonObject[`name:text`];
    event.source = jsonObject[`source`];
    if (event.source) {
      event.channel = jsonObject[`source`]['channel:text'];
      event.source.recordId = jsonObject[`source`]['recordId:text'];
    }
    event.type = jsonObject[`type:enum`];
    event.folder = jsonObject[`folder:id`];
    event.status = jsonObject[`status:enum`];
    return event;
  }

  processEventData(eventModel: IEventModel): IAddEvent {
    let addEvent = <IAddEvent>{};
    if (!eventModel) {return addEvent; }

    addEvent['end:dateTime'] = new Date(eventModel.end || '').toISOString();
    addEvent['folder:id'] = eventModel.folder;
    addEvent['isCrash:bool'] = false;
    addEvent['name:text'] = eventModel.name;
    addEvent['start:dateTime'] = new Date(eventModel.start || '').toISOString();
    addEvent['type:enum'] = eventModel.type;
    addEvent['customMetadata'] = {};
    if (eventModel.channel) {
      addEvent['source'] = {'channel:text': eventModel.channel};
    }
    return addEvent;
  }

  public getEventList(start: Date, end: Date, channels?: string[]): Observable<IEventModel[]> {
    let url = `/api/v1/store/schedule/events?startTime=${start.toLocaleString()}&endTime=${end.toLocaleString()}`;
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

  createEvent(event: IAddEvent) {
    return this.httpClient.post('/api/v1/store/schedule/events', event);
  }

  editEvent(EventID: string, event: IAddEvent) {
    return this.httpClient.post('/api/v1/store/schedule/events/' + EventID, event);
  }

  deleteEvent(EventID: string) {
    return this.httpClient.delete('/api/v1/store/schedule/events/' + EventID);
  }

}
