import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../configurations/storage_keys.configuration";
import { Cart } from "../models/cart";

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUser);
        if(user == null){
            return null;
        } else {
            return JSON.parse(user);
        }
    }

    setLocalUser(localUser : LocalUser){
        if(localUser == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(localUser));
        }
    }

    getCart(): Cart {
        let cart = localStorage.getItem(STORAGE_KEYS.cart);
        if(cart != null){
            return JSON.parse(cart);
        } else {
            return null;
        }
    }

    setCart(cart: Cart) {
        if(cart != null) {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
        } else {
            localStorage.removeItem(STORAGE_KEYS.cart);
        }
    }
    
}