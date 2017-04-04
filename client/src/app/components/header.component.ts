import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


import {UserService} from '../services/user.service';
import {GLOBAL} from '../services/global';
import {User} from '../models/user';


@Component({
	selector: 'header-main',
	templateUrl:'../views/header.html',
	providers:[UserService]
})

export class HeaderComponent implements OnInit {

	public identity;
	public token;

	constructor(private _router:Router,
		private _userService:UserService){
		this.identity=this._userService.getIdentity();
  		this.token=this._userService.getToken();
	}

	ngOnInit(){
		//console.log('Header component loaded');
	}
}	