import {Injectable} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';

import {User} from '../models/user';

@Injectable()
export class UserService{

	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}

	userExists(user:User){
		let json;
		if(user.email && user.email!=''){
			json={'email':user.email}
		}else if(user.document && user.document!=''){
			json={'document':user.document}
		}else{
			json={}
		}
		console.log(json);
		let params=JSON.stringify(json);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'users/userExists',params,{headers:headers})
				.map(res=>res.json());
	}


	registerUser(userToRegister){
		let json=JSON.stringify(userToRegister);
		let params=json;

		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'users',params,{headers:headers})
				.map(res=>res.json());
	}

	signUp(userToLogin,gethash = null){
		if(gethash!=null){
			userToLogin.gethash = gethash;
		}
		let json=JSON.stringify(userToLogin);
		let params=json;
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'users/login',params,{headers:headers})
				.map(res=>res.json());
	}

	updateUser(userToUpdate){
		let json=JSON.stringify(userToUpdate);
		let params=json;

		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':this.getToken()
		});

		return this._http.put(this.url+'updateUser/'+userToUpdate._id,params,{headers:headers})
				.map(res=>res.json());
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity!="undefined"){
			return identity;
		}else{
			return null;
		}

	}

	getToken(){
		let token = localStorage.getItem('token');

		if(token!="undefined"){
			return token;
		}else{
			return null;
		}
	}
}
