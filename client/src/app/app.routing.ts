import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import register-intro comp
import { RegisterComponent} from './components/register.component';
import { RegisterFanComponent} from './components/register-fan.component';
import { RegisterProducerComponent} from './components/register-producer.component';

const appRoutes: Routes=[
	{path:'',component:RegisterComponent},
	{path:'register',component:RegisterComponent},
	{path:'register-fan',component:RegisterFanComponent},
	{path:'register-producer',component:RegisterProducerComponent},
	{path:'**',component:RegisterComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);