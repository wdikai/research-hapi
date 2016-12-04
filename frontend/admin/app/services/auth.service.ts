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
import {
    IUser
} from '../models/IUser';
import 'rxjs/add/operator/toPromise';

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

    setIsCurrent(user: IUser) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', user.token);
    }
}