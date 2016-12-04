import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  AuthService,
  UserService
} from './services/index';
import {
  IUser
} from './models/IUser';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html'
})
export class AppComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private user: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.getCurrent()
      .then(user => user as IUser)
      .then(user => this.user.getById(user.id))
      .then(user => this.auth.setIsCurrent(user))
      .then(() => this.router.navigate(['home']))
      .catch(err => this.router.navigate(['login']));
  }
}