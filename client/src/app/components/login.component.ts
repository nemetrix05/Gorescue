import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

// We will need to import a couple of specific API’s for dealing with reactive forms
//import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroup, FormControl,Validators} from '@angular/forms';

// validators from this library https://www.npmjs.com/package/ng2-validation
import { CustomValidators } from 'ng2-validation';

import {GLOBAL} from '../services/global';

//models
import {User} from '../models/user';

//Services
import { DataService} from '../services/data.service';//comunication between components
import { ValidationService} from '../services/validation.service';
import { UserService } from '../services/user.service';



@Component({
	selector: 'login',
	templateUrl:'../views/login.html',
	providers:[UserService,ValidationService]
})

export class LoginComponent implements OnInit {
	//Content title
	public title:string;

	//Data binding user information
	public user:User;
	public identity;
	public token;
	public errorMessage;

	constructor(private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _dataService: DataService
	){
		this.title = 'LOGIN';
		this.user = new User('','','','','','','','','','','','','','','','');
	}

	ngOnInit(){
		console.log('Register component loaded');
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		console.log(this.identity)
		console.log(this.token)
	}

	/**
	 * Envia los datos de la forma
	 **/
	public onSubmit(){
		console.log(this.user);

		//Consegir los datos del usuario identiicado
		this._userService.signUp(this.user).subscribe(
			response => {
				let  identity = response.user;
				this.identity = identity;

				if(!this.identity._id){
					alert("El usuario no esta correctamente identificado")
				}else {
					// Crear elemento en el localStorage para tener al usuario en sesión
					localStorage.setItem('identity', JSON.stringify(identity));
					// consegir el token para enviarselo a cada petición HTTP
					this._userService.signUp(this.user, 'true').subscribe(
						response => {
							let  token = response.token;
							this.token = token;

							if(this.token.length <= 0){
								alert("El token no se ha generado")
							}else {
								// Crear elemento en el localStorage para tenerlo disponible
								localStorage.setItem('token', token);

								console.log(token);
								console.log(identity);
								this._dataService.updateIdentity(identity);
								this._router.navigate(['/user-dashboard']);

							}
						},
						error => {
							var errorMessage = <any>error;

							if (errorMessage != null){
								var body = JSON.parse(error._body)
								this.errorMessage = body.message;
								console.log(error);
							}
						}
					);
				}
			},
			error => {
				var errorMessage = <any>error;

				if (errorMessage != null){
					var body = JSON.parse(error._body)
					this.errorMessage = body.message;
					console.log(error);
				}
			}
		);
	}
}
