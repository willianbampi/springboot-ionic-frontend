import { ReferenceDTO } from "./reference.dto";

export interface OrderItemDTO {
    quantity: number;
    product: ReferenceDTO;
}