import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScheduleService } from './schedule.service';
import { IEventModel, EventStatus, IAddEvent } from '../event/events-model';

describe('ScheduleService', () => {
  let service: ScheduleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ScheduleService]
    }).compileComponents();
    service = TestBed.inject(ScheduleService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create new event by POST', inject([HttpTestingController, ScheduleService],
    (testingController: HttpTestingController, scheduleService: ScheduleService) => {

      scheduleService
          .createEvent({
            'name:text': 'TestCreate',
            'start:dateTime': '2021-05-09T23:59:59.123Z',
            'end:dateTime': '2021-05-09T23:59:59.999Z',
            source: { 'channel:text': '1' },
            'folder:id': 'folder1'
        })
          .subscribe({ error: e => fail(e) });

      const req = testingController.expectOne('/api/v1/store/schedule/events');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({
          'name:text': 'TestCreate',
          'start:dateTime': '2021-05-09T23:59:59.123Z',
          'end:dateTime': '2021-05-09T23:59:59.999Z',
          'source': { 'channel:text': '1' },
          'folder:id': 'folder1'
      });
  }));

  [
    { start: '2021-05-10T00:00:30.000Z', end: '2021-05-05T04:47:32.678Z', channels: undefined, result: '/api/v1/store/schedule/events?startTime=2021-05-10T00:00:30.000Z&endTime=2021-05-05T04:47:32.678Z' },
    { start: '2021-05-10T00:00:30.000Z', end: '2021-05-05T04:47:32.678Z', channels: ['A'], result: '/api/v1/store/schedule/events?startTime=2021-05-10T00:00:30.000Z&endTime=2021-05-05T04:47:32.678Z&channels=A' },
    { start: '2021-05-10T00:00:30.000Z', end: '2021-05-05T04:47:32.678Z', channels: ['A', 'B'], result: '/api/v1/store/schedule/events?startTime=2021-05-10T00:00:30.000Z&endTime=2021-05-05T04:47:32.678Z&channels=A&channels=B' }
  ].forEach(({start, end, channels, result}) => {
    it(`should get event list with correct param ${result} by GET where start: ${start}, end: ${end}, channel: ${channels}`,
    inject([HttpTestingController, ScheduleService], (testingController: HttpTestingController, scheduleService: ScheduleService) => {
        scheduleService.getEventList(new Date(start), new Date(end), channels).subscribe();

        const req = testingController.expectOne(result);
        expect(req.request.method).toEqual('GET');
      }));
  });

  it(`should get event by http GET`,
  inject([HttpTestingController, ScheduleService], (testingController: HttpTestingController, scheduleService: ScheduleService) => {
    scheduleService.getEventList(new Date('2021/05/01'), new Date('2021-05-10T07:17:34.940Z'), []).subscribe();

    const req = testingController.expectOne('/api/v1/store/schedule/events?startTime=2021-04-30T16:00:00.000Z&endTime=2021-05-10T07:17:34.940Z');
    expect(req.request.method).toEqual('GET');
  }));

  it('should edit event by http PATCH', inject([HttpTestingController, ScheduleService],
    (testingController: HttpTestingController, scheduleService: ScheduleService) => {

      scheduleService
          .editEvent('a', {
            'start:dateTime': '2021-05-09T23:59:59.123Z',
            'end:dateTime': '2021-05-09T23:59:59.999Z'
        })
          .subscribe({ error: e => fail(e) });

      const req = testingController.expectOne('/api/v1/store/schedule/events/a');
      expect(req.request.method).toEqual('PATCH');
      expect(req.request.body).toEqual({ 'start:dateTime': '2021-05-09T23:59:59.123Z', 'end:dateTime': '2021-05-09T23:59:59.999Z' });
  }));

  it('should delete event by http DELETE', inject([HttpTestingController, ScheduleService],
    (testingController: HttpTestingController, scheduleService: ScheduleService) => {

      scheduleService
          .deleteEvent('a')
          .subscribe({ error: e => fail(e) });

      const req = testingController.expectOne('/api/v1/store/schedule/events/a');
      expect(req.request.method).toEqual('DELETE');
  }));

});
