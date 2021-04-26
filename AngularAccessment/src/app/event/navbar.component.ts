import { Component } from '@angular/core';

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
                <button class="btn btn-default" >
                    Add New Event
                </button>
                </form>
                </div>
            </div>`,
    styles: [`
    #addEvent {font-size: 15px; tet-align: center;}
        `]
})

export class NavBarComponent{
    token: string = '';

    addEvent(){}

    inputToken(token: string) {
        sessionStorage.setItem('token', token);
    }
}
