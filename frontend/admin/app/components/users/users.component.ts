import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserService
} from '../../services/user.service';
import {
  IUser
} from '../../models/IUser';

@Component({
  selector: 'login',
  templateUrl: 'app/components/users/users.html',
  styleUrls: ['app/components/users/users.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  public users: IUser[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService
      .getAll()
      .then(users => this.users = users)
      .catch(err => console.error.bind(console, 'UsersComponent#ngOnInit'));
  }
}