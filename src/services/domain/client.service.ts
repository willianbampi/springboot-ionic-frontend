import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClientDTO } from "../../models/client.dto";
import { API_CONFIGURATION } from "../../configurations/api.configuration";
import { StorageService } from "../storage.service";

@Injectable()
export class ClientService {
    
    constructor(
        public httpClient: HttpClient, 
        public storageService: StorageService
    ){

    }

    findByEmail(email: string){
        let url = `${API_CONFIGURATION.baseUrl}/clients/email?email=${email}`;
        return this.httpClient.get(url);
    }

    getImageFromBucket(id: string): Observable<any> {
        let baseBucketUrl = API_CONFIGURATION.baseBucketUrl;
        if(baseBucketUrl){
            let url = `${baseBucketUrl}/cp${id}.jpg`;
            return this.httpClient.get(url, {responseType : 'blob'});
        }
    }

    insert(client: ClientDTO) {
        let url = `${API_CONFIGURATION.baseUrl}/clients`;
        return this.httpClient.post(url, client, 
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}