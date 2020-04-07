import { HttpInterceptor, HTTP_INTERCEPTORS, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { API_CONFIGURATION } from "../configurations/api.configuration";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

    constructor(
        public storageService: StorageService
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storageService.getLocalUser();
        let baseUrlLength = API_CONFIGURATION.baseUrl.length;
        let requestToAPi = req.url.substring(0, baseUrlLength) == API_CONFIGURATION.baseUrl;
        if(localUser && requestToAPi){
            const authorizationRequest = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)
            });
            return next.handle(authorizationRequest);
        } else {
            return next.handle(req);
        }
    }

}

export const AuthorizationInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true,
}