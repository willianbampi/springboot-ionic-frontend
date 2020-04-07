import { ReferenceDTO } from "./reference.dto";
import { PaymentDTO } from "./payment.dto";
import { OrderItemDTO } from "./order_item.dto";

export interface OrderDTO {
    client: ReferenceDTO;
    deliveryAddress: ReferenceDTO;
    payment: PaymentDTO;
    items: OrderItemDTO[];
}