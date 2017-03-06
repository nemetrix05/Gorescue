import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

// We will need to import a couple of specific API’s for dealing with reactive forms
//import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroup, FormControl,Validators} from '@angular/forms';

// validators from this library https://www.npmjs.com/package/ng2-validation
import { CustomValidators } from 'ng2-validation';


import { ValidationService } from '../services/validation.service';
import {ProducerService} from '../services/producer.service';
import {GLOBAL} from '../services/global';
//import {User} from '../models/user';
import {Producer} from '../models/producer';




@Component({
	selector: 'register-producer',
	templateUrl:'../views/register-producer.html',
	providers:[ProducerService,ValidationService]
})

export class RegisterProducerComponent implements OnInit {
	//Content title
	public title:string;

	//Data binding user information
	public producer:Producer;

	//data binding additional fields
	public rptPassword:string;
	public terms:string;

	//mensajes de respuesta en la forma
	public message:string;
	public errorMessage:string;


	public docTypes=[];
	public eventTypes=[];

	public registerForm: FormGroup;

	constructor(private _route:ActivatedRoute,
		private _router:Router,
		private _producerService:ProducerService
	){
		this.title = 'REGÍSTRO COMO FAN';
		this.loadFormData();
		this.iniValidation();
		this.producer = new Producer(
			'','','','','',
			'','','','','',
			'','','','','',
			'','','','',[],[]);
	}

	ngOnInit(){
		console.log('Register producer component loaded');
	}


	/**
	 * Inicializa los parametros de validación de la forma
	 **/
	private iniValidation(){
		let password =new FormControl('',[Validators.required,ValidationService.passwordValidator]);
		this.registerForm= new FormGroup({
			'password': password,
			'displayName':new FormControl('',Validators.required),
			'nit': new FormControl('',[Validators.required,CustomValidators.digits]),
			'address':new FormControl('',Validators.required),
			'phone':new FormControl('',[Validators.required,CustomValidators.digits]),
			'email':new FormControl('',Validators.required,CustomValidators.email),
			'mobile':new FormControl('',[Validators.required,CustomValidators.digits]),
			'website':new FormControl('',[Validators.required,CustomValidators.url]),
			'nameRep':new FormControl('',Validators.required),
			'lastnameRep':new FormControl('',Validators.required),
			'typeDocRep':new FormControl('',Validators.required),
			'documentRep':new FormControl('',[Validators.required,CustomValidators.digits]),
			'phoneRep':new FormControl('',[Validators.required,CustomValidators.digits]),
			'mobileRep':new FormControl('',[Validators.required,CustomValidators.digits]),
			'addressRep':new FormControl('',Validators.required),
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
		this.eventTypes = [
		    { value: 'CONCIERTOS', display: 'CONCIERTOS',col:1,checked:false},
		    { value: 'FAMILIA', display: 'FAMILIA',col:1,checked:false },
		    { value: 'CULTURA', display: 'CULTURA',col:1,checked:false },
		    { value: 'EMPRESARIALES', display: 'EMPRESARIALES',col:1,checked:false },
		    { value: 'TEATRO', display: 'TEATRO', col:2,checked:false},
		    { value: 'FESTIVALES', display: 'FESTIVALES', col:2,checked:false},
		    { value: 'ARTE', display: 'ARTE', col:2,checked:false},
		    { value: 'POLÍTICOS', display: 'POLÍTICOS', col:2,checked:false},
		    { value: 'DEPORTES', display: 'DEPORTES' ,col:3,checked:false},
		    { value: 'CONGRESOS', display: 'CONGRESOS' ,col:3,checked:false},
		    { value: 'MODA', display: 'MODA' ,col:3,checked:false},
		    { value: 'RECREACIÓN', display: 'RECREACIÓN' ,col:3,checked:false},
		    { value: 'FOROS', display: 'FOROS' ,col:4,checked:false},
		    { value: 'P.TEMÁTICOS', display: 'P.TEMÁTICOS' ,col:4,checked:false},
		    { value: 'TECNOLOGÍA', display: 'TECNOLOGÍA' ,col:4,checked:false},
		    { value: 'LGBTI', display: 'LGBTI' ,col:4,checked:false}
		];
	}

	/**
	 * Envia los datos de la forma
	 **/
	public onSubmit(){
		console.log(this.producer);
		this._producerService.registerProducer(this.producer).subscribe(
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