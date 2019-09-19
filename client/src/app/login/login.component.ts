import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../core/services/storage.service';
import { UserLogin } from '../models/user-login';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  public wrongCredentials: any;

  public loginSubscription: Subscription;
  constructor(
    private readonly authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public login(username: string, password: string) {
    const user: UserLogin = { username, password };
    this.loginSubscription = this.authService.login(user).subscribe((data) => {
      this.router.navigate(['/books']);
    }, (err: any) => {
      this.wrongCredentials = 'Wrong Username or Password';
      });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

}
