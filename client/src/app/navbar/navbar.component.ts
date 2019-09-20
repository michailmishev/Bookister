import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  AuthService
} from '../core/services/auth.service';
import {
  NgbModalConfig,
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import {
  Subscription
} from 'rxjs';
import {
  BooksDataServices
} from '../core/services/books-data.service';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public successMessage: any;
  public createBookSubscription: Subscription;
  public isNavbarCollapsed = true;
  public isBanned: boolean;

  constructor(
    private readonly authService: AuthService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private bookService: BooksDataServices,
    // private readonly usersDataService: UsersDataService,


  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.isBanned = this.authService.getBanstatus();
    }
  }

  public logout() {
    this.authService.logout();
    this.isBanned = false;
  }

  public reverseToken() {
    const reversed = this.authService.reverseToken();
    return {
      username: reversed.username,
      id: reversed.id,
    };
  }

  ngOnDestroy(): void {
    if (this.createBookSubscription) {
      this.createBookSubscription.unsubscribe();
    }
  }

  isLoggedIn() {
    if (this.authService.isAuthenticated()) {
      this.isBanned = this.authService.getBanstatus();

      return true;
    }
    return false;
  }

  //
  public setAdminStatus(): number {
    return this.authService.setAdminStatus();
  }
  //


  open(content) {
    this.modalService.open(content);
  }

  public createBook(title: string, author: string, topic: string, language: string) {
    const book = {
      title,
      author,
      topic,
      language
    };

    this.createBookSubscription = this.bookService.createBook(book).subscribe((data) => {
      if (data.message === 'Book has been submitted successfully!') {
        this.successMessage = data.message;
      }
      setTimeout(() => {
        location.reload();
      }, 1500);

      this.router.navigate(['/books']);
    }, (err: any) => {
      this.successMessage = 'Fill all fields';

    });
  }


}
