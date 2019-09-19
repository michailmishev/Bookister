import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'client';

  constructor(
    private readonly authService: AuthService,
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.authService.logout();
    }
  }

  ngOnChanges() {
    if (!this.authService.isAuthenticated()) {
      this.authService.logout();
    }
  }
}
