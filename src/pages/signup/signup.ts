import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CityService } from '../../services/domain/city.service';
import { FederativeUnityService } from '../../services/domain/federative_unity.service';
import { FederativeUnityDTO } from '../../models/federative_unity.dto';
import { CityDTO } from '../../models/city.dto';
import { ClientService } from '../../services/domain/client.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  federativeUnities: FederativeUnityDTO[];
  cities: CityDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cityService: CityService,
    public federativeUnityService: FederativeUnityService,
    public clientService: ClientService,
    public alertCrtl: AlertController
  ) {
    this.formGroup = this.formBuilder.group({
      name:['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      type: ['', [Validators.required]],
      cpfOrCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      complement: ['', []],
      neighborhood: ['', []],
      cep: ['', [Validators.required]],
      phone1: ['', [Validators.required]],
      phone2: ['', []],
      phone3: ['', []],
      federativeUnityId: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
    });
  }

  ionViewDidLoad() {
    this.federativeUnityService.findAll()
      .subscribe(response => {
        this.federativeUnities = response;
        this.formGroup.controls.federativeUnityId.setValue(this.federativeUnities[0].id);
        this.updateCities();
      },
      error => {});
  }

  updateCities() {
    let id = this.formGroup.value.federativeUnityId;
    this.cityService.findAll(id)
      .subscribe(response => {
        this.cities = response;
        this.formGroup.controls.cityId.setValue(null);
      },
      error => {});
  }

  signupUser() {
    this.clientService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }

  showInsertOk() {
    let alert = this.alertCrtl.create({
      title: 'Sucesso!',
      message: 'Cadastro realizado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
