import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShowUser } from '../../models/show-user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UsersDataService } from '../../core/services/users-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: ShowUser[] = [];
  usersSubscription: Subscription;


  constructor(
    private readonly router: Router,
    private readonly usersDataService: UsersDataService
  ) { }


  ngOnInit() {
    this.usersSubscription = this.usersDataService.getAllUsers().subscribe((users: ShowUser[]) => {
      this.users = users.sort((a: ShowUser, b: ShowUser) => a.username > b.username ? 1 : -1).map((user: ShowUser) => {
        return user;
      });
    },
      (err: any) => {
        if (err.status === 404) {
          this.router.navigate(['/not-found']);
        } else {
          this.router.navigate(['/error']);
        }
      });
  }

  public redirectToUser(userId: string): void {
    this.router.navigate(['/users', userId]);
  }

  ngOnDestroy() {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }


}

