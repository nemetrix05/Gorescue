import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

// We will need to import a couple of specific API’s for dealing with reactive forms
//import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroup, FormControl,Validators} from '@angular/forms';

// validators from this library https://www.npmjs.com/package/ng2-validation
import { CustomValidators } from 'ng2-validation';


import { ValidationService } from '../services/validation.service';
import {UserService} from '../services/user.service';
import {GLOBAL} from '../services/global';
import {User} from '../models/user';




@Component({
	selector: 'register',
	templateUrl:'../views/register.html',
	providers:[UserService,ValidationService]
})

export class RegisterComponent implements OnInit {
	//Content title
	public title:string;


	constructor(private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService
	){
		this.title = 'REGÍSTRATE COMO';
	}

	ngOnInit(){
		console.log('Register component loaded');
	}
}