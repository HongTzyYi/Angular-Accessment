import { Component } from '@angular/core';

@Component({
    selector: 'nav-bar',
    template: `<div class="navbar navbar-default">
                <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" >Angular Assessment</a>
                </div>

                <form id="addEvent"  class="navbar-form navbar-right"  >
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
    addEvent(){}
}
