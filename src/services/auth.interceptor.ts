import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = localStorage.getItem("token")
        if (token) {
            const cloned = req.clone({
                headers : req.headers.set("Authorization",token)//"Bearer "+token)
            })
            return next.handle(cloned)

        } else {
            return next.handle(req)
        }
        
        
    }

}