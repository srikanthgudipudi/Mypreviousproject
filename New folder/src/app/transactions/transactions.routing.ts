import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/eventslist/events.component';
import { EventRegistrationsComponent } from './eventregistrations/eventregistrationslist/eventregistrations.component';
import { FleetReservationsComponent } from './fleetreservations/fleetreservationlist/fleetreservations.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Events'
    },
    children: [
      { path: 'events', component: EventsComponent, data: { title: 'Srisys - Pigeon - Events' } },
      { path: 'eventregistrations', component: EventRegistrationsComponent, data: { title: 'Srisys - Pigeon - Event Registrations' } },
      { path: 'fleetreservations', component: FleetReservationsComponent, data: { title: 'Srisys - Pigeon - Fleet Reservations' } }
]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
