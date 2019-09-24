import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShowUser } from 'src/app/models/show-user';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersDataService } from '../../core/services/users-data.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit, OnDestroy {
  public user: ShowUser;
  public isBanned: boolean;
  public userSubscription: Subscription;
  public routeParamsSubscription: Subscription;
  public deleteUserSubscription: Subscription;
  // public banUserSubscription: Subscription;
  // public unbanUserSubscription: Subscription;
  public reviews;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly usersDataService: UsersDataService,
    private readonly authService: AuthService,
  ) { }

  ngOnInit() {
    this.initData();
    this.isBanned = this.authService.getBanstatus();
  }

  public isAdmin(roles: { name: string }[]): boolean {
    let isAdmin = false;
    roles.forEach((role) => {
      if (role.name === 'Admin') {
        isAdmin = true;
      }
    });
    return isAdmin;
  }



  ngOnDestroy() {
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    this.unsubscribeData();
  }


  //
  private initData() {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(
      params => {
        this.userSubscription = this.usersDataService.getUser(params.id).subscribe(
          (user: ShowUser) => {
            this.user = user;
          },
          (err: any) => {
            if (err.status === 404) {
              this.router.navigate(['/not-found']);
            } else {
              this.router.navigate(['/error']);
            }
          }
        );
        //////////
      }
    );
  }
  //


  private unsubscribeData() {
    if (this.deleteUserSubscription) {
      this.deleteUserSubscription.unsubscribe();
    }
    // if (this.banUserSubscription) {
    //   this.banUserSubscription.unsubscribe();
    // }
    // if (this.unbanUserSubscription) {
    //   this.unbanUserSubscription.unsubscribe();
    // }
  }

  public setAdminStatus(): number {
    return this.authService.setAdminStatus();
  }

  public deleteUser() {
    this.deleteUserSubscription = this.usersDataService.deleteUser(this.user.id).subscribe(
      res => {
        this.router.navigate(['/users']);
      }
    );
  }

  // public banUser(description: string) {
  //   this.banUserSubscription = this.usersDataService.banUser(this.user.id, { description }).subscribe(
  //     res => {
  //       this.unsubscribeData();
  //       this.initData();
  //     }
  //   );
  // }

  // public unbanUser() {
  //   this.unbanUserSubscription = this.usersDataService.unbanUser(this.user.id).subscribe(
  //     res => {
  //       this.unsubscribeData();
  //       this.initData();
  //     }
  //   );
  // }


  //
  public selectReview(reviewId: string) {
    this.router.navigate([`/books/1/reviews/${reviewId}`]);
  }
  //

  public isTheSamePerson(): boolean {
    const reversedToken = this.authService.reverseToken();
    if (this.user.id === reversedToken.id) {
      return true;
    }
    return false;
  }

}
