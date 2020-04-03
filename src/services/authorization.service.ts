import { Injectable } from "@angular/core";
import { CredentialDTO } from "../models/credential.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIGURATION } from "../configurations/api.configuration";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local_user";

@Injectable()
export class AuthorizationService {

    constructor(public httpClient: HttpClient, public storageService: StorageService){

    }

    authorization(credential: CredentialDTO){
        return this.httpClient.post(`${API_CONFIGURATION.baseUrl}/login`, 
                             credential, 
                             {
                                 observe: 'response', 
                                 responseType: 'text'
                            });
    }

    successfullLogin(authorizationValue : string){
        let authorizationToken = authorizationValue.substring(7);
        let user : LocalUser = {
            token: authorizationToken
        };
        this.storageService.setLocalUser(user);
    }

    logout(){
        this.storageService.setLocalUser(null);
    }

}