import {
  NgModule
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';

import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import {
  FormsModule
} from '@angular/forms';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  HttpModule
} from '@angular/http';

import {
  AppComponent
} from './app.component';
import {
  LoginComponent
} from './components/login/login.component'
import {
  UsersComponent
} from './components/users/users.component'

import {
  AuthService,
  CredentialsService,
  UserService
} from './services/index';


const appRoutes: Routes = [{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'home',
  redirectTo: 'users',
}, {
  path: 'users',
  component: UsersComponent
}];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent
  ],
  providers: [
    AuthService, 
    CredentialsService, 
    UserService,{
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}