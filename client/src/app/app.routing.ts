import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent} from './components/home.component';
import { RegisterComponent} from './components/register.component';
import { RegisterFanComponent} from './components/register-fan.component';
import { RegisterProducerComponent} from './components/register-producer.component';
import { LoginComponent} from './components/login.component'

import { UserDashboardComponent} from './components/userdashboard/user-dashboard.component';
import { UserTicketsComponent} from './components/userdashboard/user-tickets.component';
import { UserPastTicketsComponent} from './components/userdashboard/user-past-tickets.component';
import { TicketDetailComponent} from './components/userdashboard/ticket-detail.component';

const appRoutes: Routes=[
	{path:'',redirectTo: 'home/',pathMatch: 'full'},
	{path:'home/:page',component:HomeComponent},
	{path:'home/category/:category',component:HomeComponent},
	{path:'home/search/:search',component:HomeComponent},
	{path:'home/category/:category/:page',component:HomeComponent},
	{path:'register',component:RegisterComponent},
	{path:'register-fan',component:RegisterFanComponent},
	{path:'register-producer',component:RegisterProducerComponent},
	{path:'user-dashboard', component: UserDashboardComponent,
    children: [
			{ path: '',redirectTo: 'tickets/',pathMatch: 'full'},
			{ path: 'tickets/:page', component: UserTicketsComponent },
			{ path: 'ticket/:ticketId', component: TicketDetailComponent},
			{ path: 'past-tickets/:page', component: UserPastTicketsComponent },
			{ path: '**',redirectTo: 'tickets/',pathMatch: 'full'}
		]
  	},
	{path:'login',component:LoginComponent},
	{path:'**',component:HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
