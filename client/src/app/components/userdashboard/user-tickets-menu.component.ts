import {Component, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
	selector: 'user-tickets-menu',
	template:`<div class="col-md-3">
        <aside class="asidetk">
            <ul>
                <li><a [routerLink]="['/user-dashboard/tickets/',1]" [ngClass]="{'active': selectedMenu=='PRÓXIMOS EVENTOS'}">PRÓXIMOS EVENTOS</a></li>
                <li><a [routerLink]="['/user-dashboard/past-tickets/',1]" [ngClass]="{'active': selectedMenu=='EVENTOS PASADOS'}">EVENTOS PASADOS</a></li>
                <!--<li><a [routerLink]="user-dashboard/sell-tickets" [ngClass]="{'active': selectedMenu=='EN VENTA'}">EN VENTA</a></li>-->
            </ul>
        </aside> 
    </div>`
})

export class UserTicketsMenuComponent {

	@Input() selectedMenu: string;

	constructor(private _route:ActivatedRoute,
		private _router:Router
	){

	}

}