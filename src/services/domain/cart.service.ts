import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProductDTO } from "../../models/product.dto";

@Injectable()
export class CartService {

    constructor(
        public storageService: StorageService
    ) {

    }

    createOrClearCart() {
        let cart: Cart = {items: []};
        this.storageService.setCart(cart);
        return cart;
    }

    getCart() {
        let cart: Cart = this.storageService.getCart();
        if(cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProductToCart(product: ProductDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(item => item.product.id == product.id);
        if(position == -1) {
            cart.items.push({quantity: 1, product: product});
        }
        this.storageService.setCart(cart);
        return cart;
    }

    removeProductToCart(product: ProductDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(item => item.product.id == product.id);
        if(position != -1) {
            cart.items.splice(position, 1);
        }
        this.storageService.setCart(cart);
        return cart;
    }

    increaseQuantityOfProductToCart(product: ProductDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(item => item.product.id == product.id);
        if(position != -1) {
            cart.items[position].quantity++;
        }
        this.storageService.setCart(cart);
        return cart;
    }

    decreaseQuantityOfProductToCart(product: ProductDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(item => item.product.id == product.id);
        if(position != -1) {
            cart.items[position].quantity--;
            if(cart.items[position].quantity < 1){
                cart = this.removeProductToCart(product);
            }
        }
        this.storageService.setCart(cart);
        return cart;
    }

    cartAmount(): number {
        let cart = this.getCart();
        let amount = 0;
        for(var i = 0; i < cart.items.length; i++){
            amount += cart.items[i].product.price * cart.items[i].quantity;
        }
        return amount;
    }

}