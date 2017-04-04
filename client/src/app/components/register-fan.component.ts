import {Component,OnInit,ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

// We will need to import a couple of specific API’s for dealing with reactive forms
//import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroup, FormControl,Validators} from '@angular/forms';

// validators from this library https://www.npmjs.com/package/ng2-validation
import { CustomValidators } from 'ng2-validation';

import { InfoMessageComponent } from './info-message.component';

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

	//Info messages component child reference
	@ViewChild(InfoMessageComponent) infoMsg: InfoMessageComponent;

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

	//store selects data
	public docTypes=[];
	public countries = [];
	public regions = [];
	public cities = [];

	//FormGroup for validation
	public registerFanForm: FormGroup;

	//page or action loading track
	public loading:boolean;

	constructor(private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService
	){
		this.title = 'REGÍSTRO COMO FAN';
		this.loadFormData();
		
		this.user = new User('','','','','','','','','','','','','','','','');
		this.loading=false;
		
	}

	navigateTest(){
		/*let _this=this;
		this.infoMsg.setAdditionalButton("ACEPTAR",function(){
			_this._router.navigate(['/']);
		});
		this.infoMsg.showMessage("Para completar el proceso por favor siga las instrucciones que han sido enviadas a su correo","Gracias por Registrarse");
*/
		this._userService.userExists(this.user).subscribe(
	  		response => {
	  			console.log(response);
	  			this.loading=false;
	  			if(!response){
	  				this.infoMsg.setAdditionalButton("ACEPTAR");
	  				this.infoMsg.showMessage("Debido a un error desconocido su registro no ha podido ser efectuado. Por favor intente registrarse luego","Error");
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
	  				let _thisx=this;
	  				this.infoMsg.setAdditionalButton("ACEPTAR",function(){
	  					_thisx._router.navigate(['/']);
	  				});
	  				this.infoMsg.showMessage("User exists","Gracias por Registrarse");
	  			}
	  		},
	  		error => {
	  			console.log(error);
	  			var errorMessage = <any>error;
	  			if(errorMessage && errorMessage._body){
	  				var body = JSON.parse(error._body);
	  				this.infoMsg.setAdditionalButton("ACEPTAR");
	  				this.infoMsg.showMessage(body.message,"Error");
	  				//console.log(error);
	  			}
	  		}
	  	);
	}

	valCallbackTest(){
		console.log("Prueba");
		return false;
	}

	ngOnInit(){
		this.iniValidation();
		console.log('Register component loaded');
	}

	validateUserExistance(component){
		component._userService.registerUser(component.user).subscribe(
	  		response => {
	  			console.log("resp");
	  			console.log(response);
	  			return true;
	  		},
	  		error => {
	  			console.log(error);
	  			return false;
	  		}
	  	);
	}

	/**
	 * Inicializa los parametros de validación de la forma
	 */
	private iniValidation(){
		let password =new FormControl('',[Validators.required,ValidationService.passwordValidator]);
		this.registerFanForm= new FormGroup({
			//'email': new FormControl('',[Validators.required,CustomValidators.email,ValidationService.async(this._userService.registerUser,this.user)]),
			'email': new FormControl('',Validators.required,ValidationService.async(this._userService,this.user)),
			'password': password,
			'password2': new FormControl('',[Validators.required,ValidationService.matchPasswordValidator(password)]),
			'name':new FormControl('',Validators.required),
			'lastname':new FormControl('',Validators.required),
			'typeDoc':new FormControl('',Validators.required),
			'document':new FormControl('',[Validators.required,CustomValidators.digits]),
			'birthDate':new FormControl('',[Validators.required,CustomValidators.date]),
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
	 */
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
	 */
	public onSubmit(){
		console.log(this.user);
		//let birthDate=new Date(this.user.birthDate+'');
		//this.user.birthDate = birthDate.toISOString();
		this.loading=true;
		this._userService.registerUser(this.user).subscribe(
	  		response => {
	  			let user=response.user;
	  			this.loading=false;
	  			if(!user){
	  				this.infoMsg.setAdditionalButton("ACEPTAR");
	  				this.infoMsg.showMessage("Debido a un error desconocido su registro no ha podido ser efectuado. Por favor intente registrarse luego","Error");
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
	  				let _thisx=this;
	  				this.infoMsg.setAdditionalButton("ACEPTAR",function(){
	  					_thisx._router.navigate(['/']);
	  				});
	  				this.infoMsg.showMessage("Para completar el proceso por favor siga las instrucciones que han sido enviadas a su correo","Gracias por Registrarse");
	  			}
	  		},
	  		error => {
	  			this.loading=false;
	  			console.log(error);
	  			var errorMessage = <any>error;
	  			if(errorMessage && errorMessage._body){
	  				var body = JSON.parse(error._body);
	  				this.infoMsg.setAdditionalButton("ACEPTAR");
	  				this.infoMsg.showMessage(body.message,"Error");
	  				//console.log(error);
	  			}
	  		}
	  	);
	}
}