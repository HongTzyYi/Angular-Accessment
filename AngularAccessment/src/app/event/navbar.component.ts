import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { IEventModel } from './events-model';
import { ScheduleService } from '../service/schedule.service';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-bar',
    template: `<div class="navbar navbar-default">
                <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" >Angular Assessment</a>
                </div>

                <form id="addEvent"  class="navbar-form navbar-right"  >
                <div class="form-group">
                    <input [(ngModel)]="token" name="token" type="text" class="form-control" placeholder="Input token" >
                    <button class="btn btn-default" (click)="inputToken(token)">
                        Input Token
                    </button>
                </div>
                <button class="btn btn-default" (click) = "openDialog()">
                    Add New Event
                </button>
                </form>
                </div>
            </div>`,
    styles: [`
    #addEvent {font-size: 15px; tet-align: center;}
        `]
})

export class NavBarComponent {
    token: string = '';
    eventModel: IEventModel;

    constructor(private matDialog: MatDialog, private scheduleService: ScheduleService, private router: Router) {}

    inputToken(token: string) {
        sessionStorage.setItem('token', token);
        window.location.reload();
    }

    openDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = `500px`;
        dialogConfig.data = {eventModel: this.eventModel, title: 'Add New Event', type: 'ADD'};
        const dialogRef =  this.matDialog.open(DialogBodyComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`event details dialog closed`);
            console.log(result);
            if (result) {
                this.scheduleService.createEvent(this.scheduleService.processEventData(result))
            .subscribe();
            }
        });
    }

}
