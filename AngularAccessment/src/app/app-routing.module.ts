import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { EventsListComponent } from './event/events-index';

export const AppRoutes: Routes = [
  { path: 'main', component: EventsListComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' }
];
