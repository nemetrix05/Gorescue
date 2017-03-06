import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


import {UserService} from '../services/user.service';
import {GLOBAL} from '../services/global';
import {User} from '../models/user';


@Component({
	selector: 'footer-main',
	templateUrl:'../views/footer.html',
	providers:[UserService]
})

export class FooterComponent implements OnInit {

	constructor(){
		
	}

	ngOnInit(){
		console.log('Header component loaded');
	}
}	