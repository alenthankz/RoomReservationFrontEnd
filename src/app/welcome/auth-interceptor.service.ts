import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.operator.pipe(
      take(1),
      exhaustMap(agent => {
        if (!agent) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: req.headers.set(
            'Authorization',
            'Bearer ' + agent.token
          ),
        });
        
        return next.handle(modifiedReq);
      })
    );
  }
}
