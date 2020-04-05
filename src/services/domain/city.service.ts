import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIGURATION } from "../../configurations/api.configuration";
import { CityDTO } from "../../models/city.dto";

@Injectable()
export class CityService {

    constructor(
        public httpClient: HttpClient
    ){

    }

    findAll(federative_unity_id: string): Observable<CityDTO[]> {
        let url = `${API_CONFIGURATION.baseUrl}/federativeunities/${federative_unity_id}/cities`;
        console.log(url);
        return this.httpClient.get<CityDTO[]>(url);
    }
}