import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIGURATION } from "../../configurations/api.configuration";
import { CategoryDTO } from "../../models/category.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CategoryService {

    constructor(public htppClient: HttpClient){

    }

    findAll() : Observable<CategoryDTO[]> {
        return this.htppClient.get<CategoryDTO[]>(`${API_CONFIGURATION.baseUrl}/categoriess`);
    }
}