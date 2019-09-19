import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StorageService } from './services/storage.service';
// import { UsersDataService } from './services/users-data.service';
import { AuthGuardService } from './services/auth-guard.service';
import { JWTService } from './services/jwt.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    HttpClient,
    StorageService,
    // UsersDataService,
    AuthGuardService,
    JWTService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided!');
    }
  }
}
