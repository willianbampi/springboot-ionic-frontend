import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart_item';
import { API_CONFIGURATION } from '../../configurations/api.configuration';
import { ProductService } from '../../services/domain/product.service';
import { CartService } from '../../services/domain/cart.service';
import { ProductDTO } from '../../models/product.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public productService: ProductService
  ) {

  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for(var i = 0; i < this.items.length; i++){
      let item = this.items[i];
      let baseBucketUrl = API_CONFIGURATION.baseBucketUrl;
      if(baseBucketUrl){
        this.productService.getSmallImageFromBucket(item.product.id)
          .subscribe(response => {
            let url = `${baseBucketUrl}/prod${item.product.id}-small.jpg`;
            item.product.imageUrl = url;
          },
          error => {});
      }
    }
  }

  removeItem(product: ProductDTO) {
    this.items = this.cartService.removeProductToCart(product).items;
  }

  increaseQuantity(product: ProductDTO) {
    this.items = this.cartService.increaseQuantityOfProductToCart(product).items;
  }

  decreaseQuantity(product: ProductDTO) {
    this.items = this.cartService.decreaseQuantityOfProductToCart(product).items;
  }

  cartAmount(): number {
    return this.cartService.cartAmount();
  }

  goShopping() {
    this.navCtrl.setRoot('CategoryPage');
  }

}
