import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { ClientService } from '../../services/domain/client.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  addresses: AddressDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clientService: ClientService,
    public storageService: StorageService
  ) {

  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if(localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe(response => {
          this.addresses = response['addresses'];
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

}
