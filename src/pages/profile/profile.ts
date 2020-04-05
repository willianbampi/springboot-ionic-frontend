import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClientDTO } from '../../models/client.dto';
import { ClientService } from '../../services/domain/client.service';
import { API_CONFIGURATION } from '../../configurations/api.configuration';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  client: ClientDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storageService: StorageService,
    public clientService: ClientService
  ) {
  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if(localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe(response => {
          this.client = response;
          this.getImageExists();
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

  getImageExists(){
    let baseBucketUrl = API_CONFIGURATION.baseBucketUrl;
    if(baseBucketUrl){
      this.clientService.getImageFromBucket(this.client.id)
      .subscribe(response => {
        let url = `${baseBucketUrl}/cp${this.client.id}.jpg`;
        this.client.imageUrl = url;
      },
      error => {});
    }
  }

}
