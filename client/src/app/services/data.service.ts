import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import {User} from '../models/user';

@Injectable()
export class DataService {
    private dataObs = new Subject();

    getData() {
        return this.dataObs;
    }
    
    updateIdentity(identity: User) {
        this.dataObs.next(identity);
    }
}