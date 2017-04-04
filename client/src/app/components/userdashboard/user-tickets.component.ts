import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


import {UserService} from '../../services/user.service';
import {TicketService} from '../../services/ticket.service';
import {GLOBAL} from '../../services/global';
import {User} from '../../models/user';
import {Ticket} from '../../models/ticket';
import {GTEvent} from '../../models/GTevent';



@Component({
	selector: 'user-tickets',
	templateUrl:'../../views/userdashboard/user-tickets.html',
	providers:[UserService,TicketService]
})

export class UserTicketsComponent implements OnInit {

	public title;
	//property for coming tickets
	public tickets:Array<Ticket> = [];

	public user:User;

	//pagination vars
	public next_page;
	public prev_page;
	public cur_page;
	public pages:Array<number> = [];
	public total_pages;

	//aunth token
	public token;

	public errorMessage;

	public loading=false;

	constructor(private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _ticketService:TicketService
	){
		this.title='TICKETS DE PRÓXIMOS EVENTOS';
		this.next_page=1;
  		this.prev_page=1;
  		this.cur_page=1;

  		this.token=null;
  		this.loading=false;
	}

	ngOnInit(){
		
		this.user=this._userService.getIdentity();
		this.token=this._userService.getToken();
		console.log('Coming tickets component loaded '+this.user._id);
		this.loadTickets();
	}

	loadTickets(){
		//este user es de prueba pero debe cargarse del token
		let userId=this.user._id;
		this.loading=true;

		this._route.params.forEach((params:Params)=>{
			let page= +params['page'];
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
			this.tickets=[];
			let from=new Date().toISOString();
			let to=new Date('3000-01-01').toISOString();
			this._ticketService.getTicketsByUserInRange(this.token,userId,from,to).subscribe(
				response=>{
					this.loading=false;
					if(!response.tickets){
						console.log("Error: No tickets");
						//this._router.navigate(['/']);
					}else{
						
						let tickets = response.tickets;
						let countLow=GLOBAL.results_per_page*(page-1);
						let countHigh=GLOBAL.results_per_page*page;
						let count=0;
						
						for(let ticket of tickets){
							if(ticket.event!=null){
								if(count<countHigh && count>=countLow){
									this.tickets.push(ticket);
								}
								count++;
							}
						}
						let totalItems=count;
						//console.log(this.tickets);
						//console.log(tickets);
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
		  			}
				}
			);
		});
	}
}