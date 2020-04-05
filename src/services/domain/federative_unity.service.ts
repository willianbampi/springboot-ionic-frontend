import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FederativeUnityDTO } from "../../models/federative_unity.dto";
import { API_CONFIGURATION } from "../../configurations/api.configuration";

@Injectable()
export class FederativeUnityService {

    constructor(
        public httpClient: HttpClient
    ){

    }

    findAll(): Observable<FederativeUnityDTO[]> {
        let url = `${API_CONFIGURATION.baseUrl}/federativeunities`;
        return this.httpClient.get<FederativeUnityDTO[]>(url);
    }

}