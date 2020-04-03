import { Injectable } from "@angular/core";
import { CredentialDTO } from "../models/credential.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIGURATION } from "../configurations/api.configuration";

@Injectable()
export class AuthorizationService {

    constructor(public httpClient: HttpClient){

    }

    authorization(credential: CredentialDTO){
        return this.httpClient.post(`${API_CONFIGURATION.baseUrl}/login`, 
                             credential, 
                             {
                                 observe: 'response', 
                                 responseType: 'text'
                            });
    }

}