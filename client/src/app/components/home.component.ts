import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


import {UserService} from '../services/user.service';
import {EventService} from '../services/event.service';
import {GLOBAL} from '../services/global';
import {User} from '../models/user';
import {Ticket} from '../models/ticket';
import {GTEvent} from '../models/GTevent';



@Component({
	selector: 'home',
	templateUrl:'../views/home.html',
	providers:[EventService]
})

export class HomeComponent implements OnInit {

	public title;
	//property for coming tickets
	public events:Array<GTEvent> = [];

	//pagination vars
	public next_page;
	public prev_page;
	public cur_page;
	public pages:Array<number> = [];
	public total_pages;

	public current_category;

	public errorMessage;
	public categories;

	public loading=false;

	public searchText;

	constructor(private _route:ActivatedRoute,
		private _router:Router,
		private _eventService:EventService
	){
		this.title='PRÓXIMOS EVENTOS';
		this.next_page=1;
  		this.prev_page=1;
  		this.cur_page=1;
  		this.loading=false;
  		this.searchText='';
	}

	ngOnInit(){
		console.log('HOME COMPONENT LOADED ');
		this.loadCategories();
		this.loadEvents();
	}

	/**
	 * Carga los datos que requiere la forma 
	 * desde la base de datos e inicializa las variables correspondientes.
	 */
	private loadCategories(){
		this.categories=[
		    { value: 'Conciertos', display: 'Conciertos' },
		    { value: 'Deporte', display: 'Deporte' },
		    { value: 'Teatro y Cultura', display: 'Teatro y Cultura' },
		    { value: 'Familiares', display: 'Familiares' },
		    { value: 'Festivales', display: 'Festivales' },
		    { value: 'Ferias y Congresos', display: 'Ferias y Congresos' },
		    { value: 'Foros', display: 'Foros' }
		];
	}

	searchEvent(){
		this.searchText=this.searchText.trim();
		if(this.searchText!=null && this.searchText!=''){
			this.loadEvents();
		}
	}

	loadEvents(){
		this.loading=true;
		this._route.params.forEach((params:Params)=>{
			let page= +params['page'];
			let category= params['category'];
			if(category){
				this.current_category=category;
				this.title=category;
			}else{
				this.title='PRÓXIMOS EVENTOS';
				this.current_category=null;
			}

			if(!page || page<0){
				page=1;
			}
			this.cur_page=page;
			this.next_page=page;
			this.prev_page=page-1;
			if(this.prev_page<=0){
				this.prev_page=1;
			}
			this.pages=[1];
			this.events=[];
			let today=new Date();
			let toDate = new Date();
			toDate.setDate(today.getDate()+360);//90 days events
			let to=toDate.toISOString();
			let consult;
			if(this.searchText!=null && this.searchText!=''){
				consult=this._eventService.getEventsSearch(this.searchText,1);
			}else if(this.current_category!=null){
				consult=this._eventService.getEventsByCategory(category,page);
			}else{
				consult=this._eventService.getEventsSoon(to,page);
			}
			consult.subscribe(
				response=>{
					this.loading=false;
					//console.log('this.events.length='+this.events.length);
					if(!response.events){
						console.log("Error: No events");
					}else{
						
						let events = response.events;
						this.events=events;
						let totalItems=response.totalItems;
						this.pages=[];
						let total_pages=Math.trunc(totalItems/GLOBAL.results_per_page)+1;
						if(total_pages>this.cur_page) {
							this.next_page=this.cur_page+1;
						}
						for(let i=1;i<=total_pages;i++){
							this.pages.push(i);
						}
					}
				},
				error=>{
					this.loading=false;
					var errorMessage = <any>error;
		  			if(errorMessage!=null){
		  				var body = JSON.parse(error._body);
		  				this.errorMessage="Error al cargar tickets. "+body.message;
		  				console.log('this.errorMessage='+this.errorMessage);
		  			}
				}
			);
		});
	}
}