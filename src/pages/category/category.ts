import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryService } from '../../services/domain/category.service';
import { CategoryDTO } from '../../models/category.dto';
import { API_CONFIGURATION } from '../../configurations/api.configuration';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  items: CategoryDTO[];
  baseBucketUrl: string = API_CONFIGURATION.baseBucketUrl;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public categoryService: CategoryService
  ) {
  }

  ionViewDidLoad() {
    this.categoryService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {});
  }

  showProducts(category_id: string){
    this.navCtrl.push('ProductPage', {category_id: category_id});
  }

}
