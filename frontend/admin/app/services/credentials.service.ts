import {
    Injectable
} from '@angular/core';
import {
    Router
} from '@angular/router';

@Injectable()
export class CredentialsService {
    constructor(private router: Router) {}

    getToken(): string {
        let token = localStorage.getItem('token');

        if (!token) {
            this.router.navigate(['login']);
            return null;
        }

        return token;
    }
}