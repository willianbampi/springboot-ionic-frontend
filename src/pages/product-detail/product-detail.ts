import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { ProductService } from '../../services/domain/product.service';
import { API_CONFIGURATION } from '../../configurations/api.configuration';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  item: ProductDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService
  ) {

  }

  ionViewDidLoad() {
    let product_id = this.navParams.get('product_id');
    this.productService.findProductById(product_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
      error => {});
  }

  getImageUrlIfExists(){
    let baseBucketUrl = API_CONFIGURATION.baseBucketUrl;
    if(baseBucketUrl){
      this.productService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        let url = `${baseBucketUrl}/prod${this.item.id}.jpg`;
        this.item.imageUrl = url;
      },
      error => {});
    }
  }

}
