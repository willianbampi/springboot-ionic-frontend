import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClientDTO } from '../../models/client.dto';
import { ClientService } from '../../services/domain/client.service';
import { API_CONFIGURATION } from '../../configurations/api.configuration';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  client: ClientDTO;
  picture: string;
  cameraOn: boolean = false;
  profileImage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storageService: StorageService,
    public clientService: ClientService,
    public camera: Camera,
    public sanitizer: DomSanitizer
  ) {
    this.profileImage = 'assets/imgs/avatar-blank.png';
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storageService.getLocalUser();
    if(localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe(response => {
          this.client = response as ClientDTO;
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
        this.blobToDataURL(response).then(dataUrl => {
          let str: string = dataUrl as string;
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
        })
      },
      error => {
        this.profileImage = 'assets/imgs/avatar-blank.png';
      });
    }
  }

  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => fulfill(reader.result);
        reader.readAsDataURL(blob);
    })
  }

  getCameraPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    },(err) => {
      this.cameraOn = false;
    });
  }

  getGalleryPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    },(err) => {
      this.cameraOn = false;
    });
  }

  sendPicture() {
    this.clientService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.getImageExists();
      },
      error => {

      });
  }

  cancel() {
    this.picture = null;
  }

}
