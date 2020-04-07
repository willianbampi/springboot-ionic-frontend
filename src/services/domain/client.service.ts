import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClientDTO } from "../../models/client.dto";
import { API_CONFIGURATION } from "../../configurations/api.configuration";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image_util.service";

@Injectable()
export class ClientService {
    
    constructor(
        public httpClient: HttpClient, 
        public storageService: StorageService,
        public imageUtilService: ImageUtilService
    ){

    }

    findById(id: string){
        let url = `${API_CONFIGURATION.baseUrl}/clients/${id}`;
        return this.httpClient.get(url);
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

    uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData: FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        let url = `${API_CONFIGURATION.baseUrl}/clients/picture`;
        return this.httpClient.post(url, formData, 
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}