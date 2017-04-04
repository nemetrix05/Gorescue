import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


import {UserService} from '../../services/user.service';
import {GLOBAL} from '../../services/global';
import {User} from '../../models/user';



@Component({
	selector: 'user-dashboard',
	templateUrl:'../../views/userdashboard/user-dashboard.html',
	providers:[UserService]
})

export class UserDashboardComponent implements OnInit {
	//Content title
	public title:string;
	public identity;
	public token;


	constructor(private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService
	){
		this.title = 'BIENVENID@ A GOTICKET';
		this.identity=this._userService.getIdentity();
  		this.token=this._userService.getToken();
	}

	ngOnInit(){
		console.log('user dashboard loaded');
	}
}