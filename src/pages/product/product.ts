import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { ProductService } from '../../services/domain/product.service';
import { API_CONFIGURATION } from '../../configurations/api.configuration';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  items: ProductDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService,
    public loadingCtrl: LoadingController
  ) {

  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let category_id = this.navParams.get('category_id');
    let loader = this.presentLoading();
    this.productService.findProductyCategory(category_id)
      .subscribe(response => {
        this.items = response['content'];
        loader.dismiss();
        this.loadImageUrls();
      },
      error =>{
        loader.dismiss();
      });
  }

  loadImageUrls() {
    for(var i = 0; i < this.items.length; i++){
      let item = this.items[i];
      let baseBucketUrl = API_CONFIGURATION.baseBucketUrl;
      if(baseBucketUrl){
        this.productService.getSmallImageFromBucket(item.id)
          .subscribe(response => {
            let url = `${baseBucketUrl}/prod${item.id}-small.jpg`;
            item.imageUrl = url;
          },
          error => {});
      }
    }
  }

  showProductDetail(product_id: string) {
    this.navCtrl.push('ProductDetailPage', {
      product_id: product_id
    });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doResfresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
