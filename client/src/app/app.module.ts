import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { HttpModule } from '@angular/http';

//import routing module
import {routing,appRoutingProviders} from './app.routing';

import { AppComponent} from './app.component';
import { HeaderComponent} from './components/header.component';
import { FooterComponent} from './components/footer.component';
import { RegisterComponent} from './components/register.component';
import { RegisterFanComponent} from './components/register-fan.component';
import { RegisterProducerComponent} from './components/register-producer.component';
import { ControlMessagesComponent} from './components/control-messages.component';
import { ValidationService} from './services/validation.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ControlMessagesComponent,
    RegisterComponent,
    RegisterFanComponent,
    RegisterProducerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    CustomFormsModule,
    FormsModule,
    routing
  ],
  providers: [appRoutingProviders,ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
