import { Injectable } from "@angular/core";
import { CredentialDTO } from "../models/credential.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIGURATION } from "../configurations/api.configuration";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local_user";
import { JwtHelper } from "angular2-jwt";
import { CartService } from "./domain/cart.service";

@Injectable()
export class AuthorizationService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public httpClient: HttpClient, 
        public storageService: StorageService,
        public cartService: CartService
    ){

    }

    authorization(credential: CredentialDTO){
        let url = `${API_CONFIGURATION.baseUrl}/login`;
        return this.httpClient.post(url, credential, 
            {
                observe: 'response', 
                responseType: 'text'
        });
    }

    successfullLogin(authorizationValue : string){
        let authorizationToken = authorizationValue.substring(7);
        let user : LocalUser = {
            token: authorizationToken,
            email: this.jwtHelper.decodeToken(authorizationToken).sub
        };
        this.storageService.setLocalUser(user);
        this.cartService.createOrClearCart();
    }

    refreshToken(){
        let url = `${API_CONFIGURATION.baseUrl}/auth/refresh_token`;
        console.log(url);
        return this.httpClient.post(url, {}, 
            {
                observe: 'response', 
                responseType: 'text'
        });
    }

    logout(){
        this.storageService.setLocalUser(null);
    }

}