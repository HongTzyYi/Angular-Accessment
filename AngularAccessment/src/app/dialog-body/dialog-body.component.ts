import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEventModel } from '../event/events-model';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent {

  title: string;
  type: string;
  eventModel = <IEventModel>{};

  constructor(public dialogRef: MatDialogRef<DialogBodyComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = this.data.title;
    this.type = this.data.type;
    if (this.data.eventModel) {
      this.eventModel = this.data.eventModel;
      this.eventModel.start = new Date(this.data.eventModel['start:dateTime']);
      this.eventModel.end = new Date(this.data.eventModel['end:dateTime']);
    }
  }

  close() {
    this.dialogRef.close();
  }

}
