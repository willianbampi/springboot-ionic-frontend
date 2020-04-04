import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIGURATION } from "../../configurations/api.configuration";
import { CategoryDTO } from "../../models/category.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CategoryService {

    constructor(
        public htppClient: HttpClient
    ){

    }

    findAll() : Observable<CategoryDTO[]> {
        let url = `${API_CONFIGURATION.baseUrl}/categories`;
        return this.htppClient.get<CategoryDTO[]>(url);
    }
}