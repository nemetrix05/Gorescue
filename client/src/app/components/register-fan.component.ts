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
	selector: 'register-fan',
	templateUrl:'../views/register-fan.html',
	providers:[UserService,ValidationService]
})

export class RegisterFanComponent implements OnInit {
	//Content title
	public title:string;

	//Data binding user information
	public user:User;

	//data binding additional fields
	public rptPassword:string;
	public terms:string;

	//mensajes de respuesta en la forma
	public message:string;
	public errorMessage:string;


	public docTypes=[];
	public countries = [];
	public regions = [];
	public cities = [];

	public registerFanForm: FormGroup;

	constructor(private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService
	){
		this.title = 'REGÍSTRO COMO FAN';
		this.loadFormData();
		this.iniValidation();
		this.user = new User('','','','','','','','','','','','','','','','');
		
		
	}

	ngOnInit(){
		console.log('Register component loaded');
	}


	/**
	 * Inicializa los parametros de validación de la forma
	 **/
	private iniValidation(){
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

	/**
	 * Carga los datos que requiere la forma 
	 * desde la base de datos e inicializa las variables correspondientes.
	 **/
	private loadFormData(){
		this.docTypes=[
		    { value: 'CC', display: 'C.C' },
		    { value: 'CE', display: 'C.E' },
		    { value: 'Pasaporte', display: 'PASAPORTE' },
		    { value: 'NIT', display: 'NIT' }
		];
		this.countries = [
		    { value: 'Colombia', display: 'Colombia' },
		    { value: 'Mexico', display: 'Mexico' }
		];
		this.regions = [
		    { value: 'Cundinamarca', display: 'Cundinamarca' }
		];
		this.cities = [
		    { value: 'Bogota', display: 'Bogota' }
		];
	}

	/**
	 * Envia los datos de la forma
	 **/
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
}