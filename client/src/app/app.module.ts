import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './shared/error/error.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerInterceptor } from './interceptors/spinner-interceptor.service';
import { BooksListComponent } from './books/books-list/books-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { InputCounterModule } from 'ng4-input-counter';
import { UsersComponent } from './user/users/users.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { UserViewComponent } from './user/user-view/user-view.component';
import { UserModule } from './user/user.module';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    // UserViewComponent,
    // UsersListComponent,
    // UsersComponent,
    // BooksListComponent,
    // ErrorComponent,
    // NotFoundComponent
  ],

  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSpinnerModule,
    UserModule,
    NgxPaginationModule,
    InputCounterModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['example.com'],
        blacklistedRoutes: ['/books']
      }
    })

  ],

  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
