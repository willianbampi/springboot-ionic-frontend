import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIGURATION } from "../../configurations/api.configuration";
import { Observable } from "rxjs/Rx";
import { ProductDTO } from "../../models/product.dto";

@Injectable()
export class ProductService {

    constructor(
        public httpClient: HttpClient
    ){

    }

    findProductyCategory(category_id: string) {
        let url = `${API_CONFIGURATION.baseUrl}/products/page?categories=${category_id}`;
        return this.httpClient.get(url);
    }

    getSmallImageFromBucket(id: string): Observable<any> {
        let baseBucketUrl = API_CONFIGURATION.baseBucketUrl;
        if(baseBucketUrl){
            let url = `${baseBucketUrl}/prod${id}-small.jpg`;
            return this.httpClient.get(url, {responseType: 'blob'});
        }
    }

    findProductById(product_id: string) {
        let url = `${API_CONFIGURATION.baseUrl}/products/${product_id}`;
        return this.httpClient.get<ProductDTO>(url);
    }

    getImageFromBucket(id: string): Observable<any> {
        let baseBucketUrl = API_CONFIGURATION.baseBucketUrl;
        if(baseBucketUrl){
            let url = `${baseBucketUrl}/prod${id}.jpg`;
            return this.httpClient.get(url, {responseType: 'blob'});
        }
    }

}