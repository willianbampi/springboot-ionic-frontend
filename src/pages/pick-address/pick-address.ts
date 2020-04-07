import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { ClientService } from '../../services/domain/client.service';
import { StorageService } from '../../services/storage.service';
import { OrderDTO } from '../../models/order.dto';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  addresses: AddressDTO[];

  order: OrderDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clientService: ClientService,
    public storageService: StorageService,
    public cartService: CartService
  ) {

  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if(localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe(response => {
          this.addresses = response['addresses'];
          let cart = this.cartService.getCart();
          this.order = {
            client: {
              id: response['id']
            },
            deliveryAddress: null,
            payment: null,
            items: cart.items.map(item => {
              return {
                quantity: item.quantity, 
                product: {
                  id: item.product.id
                }
              }
            })
          }
        },
        error => {
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        });
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(address: AddressDTO) {
    this.order.deliveryAddress = {
      id: address.id
    };
    console.log(this.order);
  }

}
