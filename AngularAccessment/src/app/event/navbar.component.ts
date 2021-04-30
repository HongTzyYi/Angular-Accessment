import { Component } from '@angular/core';

@Component({
    selector: 'nav-bar',
    template: `<div class="navbar navbar-default">
                <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" >Angular Assessment</a>
                </div>

                <form id="addToken"  class="navbar-form navbar-right"  >
                <div class="form-group">
                    <input [(ngModel)]="token" name="token" type="text" class="form-control" placeholder="omit 'bearer' word in token" >
                    <button class="btn btn-default" (click)="inputToken(token)">
                        Input Token
                    </button>
                </div>
                </form>
                </div>
            </div>`,
    styles: [`
    #addToken {font-size: 15px; text-align: center; }
        `]
})

export class NavBarComponent {
    token: string = '';

    inputToken(token: string) {
        sessionStorage.setItem('token', token);
        window.location.reload();
    }
}
