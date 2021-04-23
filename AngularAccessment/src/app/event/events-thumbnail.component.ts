import { Component, Input } from '@angular/core';
import { IEventModel } from './events-model';

@Component({
    selector: 'events-thumbnail',
    templateUrl: `events-thumbnail.component.html`
})

export class EventsThumbnailComponent{
    @Input() event: IEventModel;

    // placeholder function to API service
    startRecord(){}

    editRecord(){}

    deleteRecord(){}
}
