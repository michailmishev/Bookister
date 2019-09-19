import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    constructor(private spinner: NgxSpinnerService) {}

    public intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      this.spinner.show();

      return next.handle(req).pipe(
        delay(500),
        finalize(() => this.spinner.hide())
      );
    }
}
