import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredentialDTO } from '../../models/credential.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credential: CredentialDTO = {
    email: "",
    password: ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login() {
    console.log(this.credential);
    this.navCtrl.setRoot('CategoryPage');
  }

}
