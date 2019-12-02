import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()

export class ErrorInteceptor implements HttpInterceptor {
    intercept(
        req: import('@angular/common/http').HttpRequest<any>,
        next: import('@angular/common/http').HttpHandler): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
            return next.handle(req).pipe(
                catchError(httpErrorResponse => { // HttpErrorResponse returned in the console
                    if (httpErrorResponse.status === 401) {
                        return throwError(httpErrorResponse.statusText);
                    }
                    if (httpErrorResponse instanceof HttpErrorResponse) {
                        const applicationError = httpErrorResponse.headers.get('Application-Error');
                         // this is what we defined in the .net code
                        if (applicationError) {
                            return throwError(applicationError);
                        }
                        const serverError = httpErrorResponse.error;
                        let modalStateErrors = '';
                        if (serverError.errors && typeof serverError.errors === 'object') {
                            for (const key in serverError.errors) {
                                if (serverError.errors[key]) {
                                    modalStateErrors += serverError.errors[key] + '\n' ;
                                }
                            }
                        }
                        return throwError(modalStateErrors || serverError || 'Server Error');
                         // show modalStateErrors if not then show serverError if not.....
                    }
                })
            );
        }

}


export const ErrorInteceptorProvider = {
provide : HTTP_INTERCEPTORS,
useClass : ErrorInteceptor,
multi : true
};
