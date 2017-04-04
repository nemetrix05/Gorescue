import { Component,OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { User } from './models/user';
import {GLOBAL} from './services/global';

//Services
import {DataService} from './services/data.service';//comunication between components
import {UserService} from './services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	//styleUrls: ['./app.component.css'],
	providers: [UserService]
})

export class AppComponent {
	//public user: User;
	public identity;
	//public message;
	public url;

	constructor(private _userService:UserService,
		private _dataService: DataService,
		private _router:Router){
    	this.url=GLOBAL.url;
  	}

  	ngOnInit(){
  		this.identity=this._userService.getIdentity();
    	this._dataService.getData().subscribe(identity => this.identity = identity);
  		//console.log(this.identity);
  	}

  	logOut(){
  		localStorage.removeItem('identity');
		localStorage.removeItem('token');
		localStorage.clear();
		this.identity = null;
		this._router.navigate(['/login']);
  	}
}
