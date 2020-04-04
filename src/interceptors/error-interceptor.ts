import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public storageService: StorageService,
        public alertCtrl: AlertController
    ){

    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req)
        .catch((error, caught) => {
            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }
            console.log("Erro detectado pelo Interceptor:");
            console.log(errorObj);

            switch(errorObj.status){
                case 401:
                    this.handle401();
                    break;
                case 403:
                    this.handle403();
                    break;
                case 404:
                    this.handle404();
                    break;
                default:
                    this.handleDefaultError(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha na autorização',
            message: 'Email ou senha inválidos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }

    handle403() {
        this.storageService.setLocalUser(null);
    }

    handle404() {
        let alert = this.alertCtrl.create({
            title: 'Erro 404: recurso não encontrado',
            message: 'O recurso solicitado não foi encontrado no servidor',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }

    handleDefaultError(error) {
        let alert = this.alertCtrl.create({
            title: 'Erro ' + error.status + ': ' + error.error,
            message: error.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};