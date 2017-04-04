import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { HttpModule } from '@angular/http';

//import routing module
import {routing,appRoutingProviders} from './app.routing';

//traversal components
import { AppComponent} from './app.component';
import { HeaderComponent} from './components/header.component';
import { FooterComponent} from './components/footer.component';
import { ControlMessagesComponent} from './components/control-messages.component';
import { InfoMessageComponent} from './components/info-message.component';

//main page components
import { HomeComponent} from './components/home.component';


//register components
import { RegisterComponent} from './components/register.component';
import { RegisterFanComponent} from './components/register-fan.component';
import { RegisterProducerComponent} from './components/register-producer.component';

//user-dashboard components
import { UserDashboardComponent} from './components/userdashboard/user-dashboard.component';
import { UserTicketsMenuComponent} from './components/userdashboard/user-tickets-menu.component';
import { UserTicketsComponent} from './components/userdashboard/user-tickets.component';
import { UserPastTicketsComponent} from './components/userdashboard/user-past-tickets.component';
import { TicketDetailComponent} from './components/userdashboard/ticket-detail.component';

//Services
import { DataService} from './services/data.service';//comunication between components
import { ValidationService} from './services/validation.service';

import { LoginComponent} from './components/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ControlMessagesComponent,
    InfoMessageComponent,
    HomeComponent,
    RegisterComponent,
    RegisterFanComponent,
    RegisterProducerComponent,
    UserDashboardComponent,
    UserTicketsMenuComponent,
    UserTicketsComponent,
    UserPastTicketsComponent,
    TicketDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    CustomFormsModule,
    FormsModule,
    routing
  ],
  providers: [appRoutingProviders,ValidationService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
