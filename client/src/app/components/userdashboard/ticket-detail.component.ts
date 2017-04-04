import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


import {UserService} from '../../services/user.service';
import {TicketService} from '../../services/ticket.service';
import {GLOBAL} from '../../services/global';
import {User} from '../../models/user';
import {Ticket} from '../../models/ticket';
import {GTEvent} from '../../models/GTevent';



@Component({
	selector: 'ticket-detail',
	templateUrl:'../../views/userdashboard/ticket-detail.html',
	providers:[UserService,TicketService]
})

export class TicketDetailComponent implements OnInit {

	public title;

	public user:User;

	public ticket:Ticket;

	//aunth token
	public token;
	public errorMessage;

	constructor(private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _ticketService:TicketService
	){
		this.title='DETALLES';

  		this.token=null;
	}

	ngOnInit(){
		console.log('Ticket detail component loaded');
		this.loadLoggedUser();
		this.loadTicket();
	}

	loadLoggedUser(){
		this.user = new User('58c200dce2cb2e776896f8e0','','','','','','','','','','','','','','','');
	}

	loadTicket(){
		//este user es de prueba pero debe cargarse del token
		let userId=this.user._id;

		this._route.params.forEach((params:Params)=>{
			let ticketId= params['ticketId'];
			
			
			this._ticketService.getTicket(this.token,ticketId).subscribe(
				response=>{
					if(!response.ticket){
						this.errorMessage="Error: El ticket no existe.";
					}else{
						
						this.ticket=response.ticket;

						//Revisar que el usuario del ticket corresponda con el usuario loggeado
						if(this.ticket.user){
							let userTicket=JSON.parse(JSON.stringify(this.ticket.user))
							if(userTicket._id!=this.user._id){
								this.errorMessage="No esta autorizado a ver la informacion de este tickete";
								this.ticket=null;
							}
						}
					}
				},
				error=>{
					var errorMessage = <any>error;
		  			if(errorMessage!=null){
		  				var body = JSON.parse(error._body);
		  				this.errorMessage="Error al cargar ticket. "+body.message;
		  			}
				}
			);
		});
	}
}