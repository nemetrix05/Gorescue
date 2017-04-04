import {Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';

@Injectable()
export class EventService{
	
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}

	/**
	* Request API to get a event given its id
	* @param {eventId:string} - event id
	* @author Jaime Beltran
	*/
	getEvent(eventId:string){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options=new RequestOptions({headers:headers});

		return this._http.get(this.url+'event/'+eventId,options)
				.map(res=>res.json());
	}

	/**
	* Request API to get all events from DB in pages
	* @param {page:number} - page number
	* @author Jaime Beltran
	*/
	getEvents(page:number){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options=new RequestOptions({headers:headers});

		return this._http.get(this.url+'events/'+page,options).map(res=>res.json());
	}


	/**
	* Request API to get all events from DB in pages
	* @param {page:number} - page number
	* @author Jaime Beltran
	*/
	getEventsSearch(searchText:string,page:number){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options=new RequestOptions({headers:headers});

		return this._http.get(this.url+'events/search/'+searchText+'/'+page,options).map(res=>res.json());
	}

	/**
	* Request API to get events promoted 
	* @param {page:number} - page number
	* @author Jaime Beltran
	*/
	getEventsPromoted(page:number){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options=new RequestOptions({headers:headers});

		return this._http.get(this.url+'events/promoted/'+page,options)
				.map(res=>res.json());
	}

	/**
	* Request API to get all events from now to an specific date
	* @param {to:string} - date(and time) format ISODate
	* @param {page:number} - page number
	* @author Jaime Beltran
	*/
	getEventsSoon(to:string,page:number){
		let headers = new Headers({
			'Content-Type':'application/json'
		});		

		let options=new RequestOptions({headers:headers});
		//console.log(this.url+'events/soon/'+to+'/'+page,options);
		return this._http.get(this.url+'events/soon/'+to+'/'+page,options).map(res=>res.json());
	}

	/**
	* Request API to all events by category
	* @param {category:string} - event category
	* @param {page:number} - page number
	* @author Jaime Beltran
	*/
	getEventsByCategory(category:string,page:number){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options=new RequestOptions({headers:headers});

		return this._http.get(this.url+'events/category/'+category+'/'+page,options).map(res=>res.json());
	}

	/**
	* Request API to all events by category
	* @param {category:string} - event category
	* @param {page:number} - page number
	* @author Jaime Beltran
	*/
	getEventsActive(page:number){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options=new RequestOptions({headers:headers});

		return this._http.get(this.url+'events/active/'+page,options).map(res=>res.json());
	}

	/**
	* Request API to store a event
	* @param {token:string} - token to identify user sesion
	* @param {event:event} - event to store
	* @author Jaime Beltran
	*/
	saveEvent(token,event){
		let json=JSON.stringify(event);
		let params=json;


		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.post(this.url+'event',params,{headers:headers})
				.map(res=>res.json());
	}

	/**
	* Request API to update a event
	* @param {token:string} - token to identify user sesion
	* @param {event:event} - event to update
	* @author Jaime Beltran
	*/
	updateEvent(token,event){
		let json=JSON.stringify(event);
		let params=json;

		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.put(this.url+'event/'+event._id,params,{headers:headers})
				.map(res=>res.json());
	}

	/**
	* Request API to update a event status
	* @param {token:string} - token to identify user sesion
	* @param {event:event} - event to update
	* @param {status:string} - status
	* @author Jaime Beltran
	*/
	updateEventStatus(token,event,status:string){
		let json=JSON.stringify(event);
		let params=json;

		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.put(this.url+'event/status/'+event._id+'/'+status,params,{headers:headers}).map(res=>res.json());
	}
}
