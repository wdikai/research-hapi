import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  AuthService
} from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: 'app/components/login/login.html',
  styleUrls: ['app/components/login/login.css'],
  providers: [AuthService]
})
export class LoginComponent {
  public email: string;
  public password: string;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth
      .login({
        email: this.email,
        password: this.password
      })
      .then(user => this.auth.setIsCurrent(user))
      .then(() => this.router.navigate(['home']))
      .catch(console.log.bind(console));
  }
}