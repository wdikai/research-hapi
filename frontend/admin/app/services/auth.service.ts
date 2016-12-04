import {
    Injectable
} from '@angular/core';
import {
    Headers,
    Http
} from '@angular/http';
import {
    Router
} from '@angular/router';
import 'rxjs/add/operator/toPromise';

import {
    IUser
} from '../models/IUser';

@Injectable()
export class AuthService {
    private url = '/api/auth';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(private http: Http,
        private router: Router) {}

    login(data: any): Promise < IUser > {

        return this.http
            .post(`${this.url}/local`, JSON.stringify(data), {
                headers: this.headers
            })
            .toPromise()
            .then(res => res.json() as IUser);
    }

    getCurrent(): Promise < any > {
        let user: IUser;
        try {
            let userJson = localStorage.getItem('user');
            user = JSON.parse(userJson) as IUser;
            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    setIsCurrent(user: IUser): IUser {
        let token = user ? user.token : '';

        localStorage.setItem('user', JSON.stringify(user));
        if (token as string) localStorage.setItem('token', token);

        return user;
    }
}