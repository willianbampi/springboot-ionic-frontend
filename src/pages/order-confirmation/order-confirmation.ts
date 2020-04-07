import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderDTO } from '../../models/order.dto';
import { CartItem } from '../../models/cart_item';
import { CartService } from '../../services/domain/cart.service';
import { ClientDTO } from '../../models/client.dto';
import { AddressDTO } from '../../models/address.dto';
import { ClientService } from '../../services/domain/client.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  order: OrderDTO;
  cartItems: CartItem[];
  client: ClientDTO;
  address: AddressDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clientService: ClientService
  ) {
    this.order = this.navParams.get('order');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.clientService.findById(this.order.client.id)
      .subscribe(response => {
        this.client = response as ClientDTO;
        this.address = this.findAddress(this.order.deliveryAddress.id, response['addresses']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }

  private findAddress(id: string, addresses: AddressDTO[]): AddressDTO {
    let position = addresses.findIndex(address => address.id == id);
    return addresses[position];
  }

  orderAmount() {
    return this.cartService.cartAmount();
  }

}
