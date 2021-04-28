export enum EventStatus {
    Requesting = 'Requesting',
    Requested = 'Requested',
    Pending = 'Pending',
    Ready = 'Ready',
    Cueing = 'Cueing',
    Cued = 'Cued',
    Recording = 'Recording',
    Done = 'Done',
    Failed = 'Failed',
    Warning = 'Warning'
}

export enum EventType {
    Active = 'Active',
    Inactive = 'Inactive',
    Reserved = 'Reserved'
}

export interface IEventModel {
    event?: string;
    name?: string;
    start?: Date;
    end?: Date;
    source?: { channel: string, recordId?: string };
    channel?: string;
    status?: EventStatus;
    type?: EventType;
    folder?: string;
}

export interface IAddEvent {
    'name:text'?: string;
    'folder:id'?: string;
    'start:dateTime'?: string;
    'end:dateTime'?: string;
    'isCrash:bool'?: boolean;
    'source'?: {
      'channel:text'?: string;
    };
    'customMetadata'?: {};
    'type:enum'?: EventType;
}

export interface IEditEvent {
    'start:dateTime'?: string;
    'end:dateTime'?: string;
}
