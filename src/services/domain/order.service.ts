import { Injectable } from "@angular/core";
import { OrderDTO } from "../../models/order.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIGURATION } from "../../configurations/api.configuration";

@Injectable()
export class OrderService {

    constructor(
        public httpClient: HttpClient
    ){

    }

    insert(order: OrderDTO) {
        let url = `${API_CONFIGURATION.baseUrl}/orders`;
        return this.httpClient.post(url, order, {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}