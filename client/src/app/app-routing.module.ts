import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard } from '../../src/app/core/services/auth-guard.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ErrorComponent } from './shared/error/error.component';
import { BooksListComponent } from './books/books-list/books-list.component';
//
import { TestBooksComponent } from './test-books/test-books.component';
//



const routes: Routes = [
  // { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '', redirectTo: '/test', pathMatch: 'full' },
  //
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  //
  { path: 'test', component: TestBooksComponent  , canActivate: [AuthGuard]  },
  // { path: 'test', /* loadChildren: './test/test.module#TestModule' */ /*, canActivate: [AuthGuard] */ },
  //
  { path: 'books', loadChildren: './books/books.module#BooksModule', canActivate: [AuthGuard] },
  // { path: 'users', loadChildren: './user/user.module#UserModule', canActivate: [AuthGuard] },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
