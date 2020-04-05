import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { CityService } from '../../services/domain/city.service';
import { FederativeUnityService } from '../../services/domain/federative_unity.service';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers: [
    CityService,
    FederativeUnityService
  ]
})
export class SignupPageModule {}
