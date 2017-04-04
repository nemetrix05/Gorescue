import {Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';

@Injectable()
export class TicketService{
	
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}

	/**
	* Request API to get a ticket given its id
	* @param {token:string} - token to identify user sesion
	* @param {ticketId:string} - ticket id
	* @author Jaime Beltran
	*/
	getTicket(token,ticketId:string){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options=new RequestOptions({headers:headers});

		return this._http.get(this.url+'ticket/'+ticketId,options)
				.map(res=>res.json());
	}

	/**
	* Request API to get all tickets from DB in pages
	* @param {token:string} - token to identify user sesion
	* @param {page:number} - page number
	* @author Jaime Beltran
	*/
	getTickets(token,page:number){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options=new RequestOptions({headers:headers});

		return this._http.get(this.url+'tickets/e/p/'+page,options)
				.map(res=>res.json());
	}

	/**
	* Request API to get tickets from a user given its id
	* @param {token:string} - token to identify user sesion
	* @param {userId:string} - user id
	* @param {page:number} - page number
	* @author Jaime Beltran
	*/
	getTicketsByUser(token,userId:string,page:number){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options=new RequestOptions({headers:headers});

		return this._http.get(this.url+'tickets/'+userId+'/e/p/'+page,options)
				.map(res=>res.json());
	}

	/**
	* Request API to get all tickets of a user given the events date range
	* @param {token:string} - token to identify user sesion
	* @param {userId:string} - user id
	* @param {from:string} - date(and time) format ISODate
	* @param {to:string} - date(and time) format ISODate
	* @author Jaime Beltran
	*/
	getTicketsByUserInRange(token,userId:string,from:string,to:string){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});		

		let options=new RequestOptions({headers:headers});

		return this._http.get(this.url+'tickets/'+from+'/'+to+'/'+userId,options)
				.map(res=>res.json());
	}

	/**
	* Request API to all tickets from an event given its id
	* @param {token:string} - token to identify user sesion
	* @param {eventId:string} - event id
	* @param {page:number} - page number
	* @author Jaime Beltran
	*/
	getTicketsByEvent(token,eventId:string,page:number){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options=new RequestOptions({headers:headers});

		return this._http.get(this.url+'tickets/e/'+eventId+'/p/'+page,options)
				.map(res=>res.json());
	}

	/**
	* Request API to store a ticket
	* @param {token:string} - token to identify user sesion
	* @param {ticket:Ticket} - ticket to store
	* @author Jaime Beltran
	*/
	saveTicket(token,ticket){
		let json=JSON.stringify(ticket);
		let params=json;


		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.post(this.url+'tickets',params,{headers:headers})
				.map(res=>res.json());
	}

	/**
	* Request API to update a ticket
	* @param {token:string} - token to identify user sesion
	* @param {ticket:Ticket} - ticket to update
	* @author Jaime Beltran
	*/
	updateTicket(token,ticket){
		let json=JSON.stringify(ticket);
		let params=json;

		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.put(this.url+'tickets/'+ticket._id,params,{headers:headers})
				.map(res=>res.json());
	}
}
