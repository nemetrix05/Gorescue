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
	//Variable to display intro or form
	public type:string;
	public user:User;
	public rptPassword:string;
	public terms:string;
	public message:string;
	public errorMessage:string;

	public registerFanForm: FormGroup;

	constructor(private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService
	){
		this.title = 'REGÍSTRATE COMO';
		this.type = null;
		this.user = new User('','','','','','','','','','','','','','','','');
		let password =new FormControl('',[Validators.required,ValidationService.passwordValidator]);
		this.registerFanForm= new FormGroup({
			'email': new FormControl('',[Validators.required,CustomValidators.email]),
			'password': password,
			'password2': new FormControl('',[Validators.required,ValidationService.matchPasswordValidator(password)]),
			'name':new FormControl('',Validators.required),
			'surname':new FormControl('',Validators.required),
			'typeDoc':new FormControl('',Validators.required),
			'document':new FormControl('',[Validators.required,CustomValidators.digits]),
			'birthDate':new FormControl('',[Validators.required,ValidationService.date]),
			'phone':new FormControl('',[Validators.required,CustomValidators.digits]),
			'mobile':new FormControl('',[Validators.required,CustomValidators.digits]),
			'country':new FormControl('',Validators.required),
			'region':new FormControl('',Validators.required),
			'city':new FormControl('',Validators.required),
			'address':new FormControl('',Validators.required),
			'terms':new FormControl(false,ValidationService.termsAccepted)
		});
	}

	ngOnInit(){
		console.log('Register component loaded');
		this.loadParams();
	}

	/**
	* Load params into class vars from url using ActivatedRoute property
	**/
	private loadParams(){
		this._route.params.forEach((params:Params)=>{
			let type=params['type'];
			this.type=type;
		});
	}

	public prueba(){
		console.log(this.user);
	}


	public onSubmit(){
		console.log(this.user);
		this._userService.registerUser(this.user).subscribe(
	  		response => {
	  			let user=response.user;
	  			
	  			if(!user){
	  				this.errorMessage="Debido a un error desconocido su registro no ha podido ser efectuado. Por favor intente registrarse luego.";
	  				this.message=null;
	  			}else{
	  				//this.user = user;
	  				/*localStorage.setItem('identity',JSON.stringify(this.user));

	  				if(!this.filesToUpload){
	  					//redireccion
	  				}else{
	  					let newUrl=this.url+'uploadImageUser/'+this.user._id;
	  					let myThis=this;
	  					this.makeFileRequest(newUrl,[],this.filesToUpload).then(function(result:any){
	  						myThis.user.image=result.image;
	  						localStorage.setItem('identity',JSON.stringify(myThis.user));

	  						//console.log(myThis.user);
	  					});
	  				}*/

	  				this.message="Gracias por Registrarse";
	  				this.errorMessage=null;
	  			}
	  		},
	  		error => {
	  			console.log(error);
	  			var errorMessage = <any>error;
	  			if(errorMessage && errorMessage._body){
	  				var body = JSON.parse(error._body);
	  				this.errorMessage=body.message;
	  				this.message=null;
	  				//console.log(error);
	  			}
	  		}
	  	);
	}

	/* standing data goes here*/
	public docTypes = [
	    { value: 'CC', display: 'C.C' },
	    { value: 'CE', display: 'C.E' },
	    { value: 'Pasaporte', display: 'PASAPORTE' },
	    { value: 'NIT', display: 'NIT' }
	];
	public countries = [
	    { value: 'Colombia', display: 'Colombia' },
	    { value: 'Mexico', display: 'Mexico' }
	];
	public regions = [
	    { value: 'Cundinamarca', display: 'Cundinamarca' }
	];
	public cities = [
	    { value: 'Bogota', display: 'Bogota' }
	];
	public toggles = [
	    { value: 'toggled', display: 'Toggled' },
	    { value: 'untoggled', display: 'UnToggled' },
	];
/* end standing data */
}