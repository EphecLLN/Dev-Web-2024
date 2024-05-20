import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Outgoing request:", request);

        // Modifiez la requête sortante si nécessaire
        request = request.clone({ withCredentials: true });

        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log("Incoming response:", event);
                }
            }),
            catchError(error => {
                console.error("Error:", error);
                throw error;
            })
        );
    }
}
