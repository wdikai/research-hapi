import {
    Injectable
} from '@angular/core';
import {
    Headers,
    Http
} from '@angular/http';
import {
    IUser
} from '../models/IUser';
import {
    AccessService
} from './access.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private url = '/api/users';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(private http: Http, private acces: AccessService) {
        let token = acces.getToken();
        this.headers.append('Authorization', `Bearer ${token}`);
    }

    getAll(): Promise < IUser[] > {
        return this.http
            .get(this.url, {
                headers: this.headers
            })
            .toPromise()
            .then(res => res.json() as IUser[]);
    }

    getById(id): Promise < IUser > {
        return this.http
            .get(`${this.url}/${id}`, {
                headers: this.headers
            })
            .toPromise()
            .then(res => res.json() as IUser);
    }
}