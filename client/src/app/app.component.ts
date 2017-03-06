import { Component,OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { User } from './models/user';
import {UserService} from './services/user.service';
import {GLOBAL} from './services/global';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	//styleUrls: ['./app.component.css'],
	providers: [UserService]
})

export class AppComponent {
	public user: User;
	public identity;
	public token;
	public message;
	public url;

	constructor(private _userService:UserService){
    	this.url=GLOBAL.url;
  	}

  	ngOnInit(){
  		//this.identity=this._userService.getIdentity();
  		//this.token=this._userService.getToken();

  		//console.log(this.identity);
  		//console.log(this.token);
  	}
}
