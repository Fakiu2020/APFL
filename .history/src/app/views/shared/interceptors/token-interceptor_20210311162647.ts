import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authentication } from '../../models/authentication';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    private readonly authorizationData = new Authentication();

    constructor() {
        this.authorizationData= JSON.parse(localStorage.getItem('authorizationData'));
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authorizationData.token) {
            const modReq = req.clone({
                setHeaders: {
                    'Authorization':  'Bearer ' + this.authorizationData.token
                }
            });
            return next.handle(modReq);
        }
        return next.handle(req);
    }
}