import { Component, OnInit } from '@angular/core';
import { observeInsideAngular } from '@angular/fire';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product/products.model';
import { OrderService } from 'src/app/shared/services/order/order.service';


@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
    public basket: Array<IProduct> = [];
    public totalPayment!: string;
    public totalPrice = 0;
    public orderForm!: UntypedFormGroup;
    public discount: any;
    public indexBtn!: any;
    

    constructor(
        private orderService: OrderService,
        private fb: UntypedFormBuilder
    ) { }

    ngOnInit(): void {
        this.initOrderForm();
        this.getLocalProducts();
        this.orderService.stream$.next(this.getCount(this.basket));
    }
    

    initOrderForm(): void {
        this.orderForm = this.fb.group({
            userName: [null, Validators.required],
            userPhone: [null, Validators.required],
            userCity: [null, Validators.required],
            userStreet: [null, Validators.required],
            userHouse: [null, Validators.required],
            userComment: [null]
        })
    }

    private getLocalProducts(): void {
        if (localStorage.getItem('basket')) {
            this.basket = JSON.parse(<string>localStorage.getItem('basket'));
            this.totalPrice = this.getTotal(this.basket);
            this.discount = Math.round(this.getTotalDiscount(this.basket) / 100 * 5);
        }
    }

    private getTotal(products: Array<IProduct>): number {
        return products.reduce((total, prod) => total + (prod.price * prod.count), 0);
    }
    
    private getTotalDiscount(products: Array<IProduct>): number {
        return products.reduce((total, prod) => total + (prod.price * prod.count), 0);
    }

    private getCount(products: Array<IProduct>) {
        return products.reduce((total, prod) => total + prod.count, 0);
    }


    productCount(product: IProduct, status: boolean): void {
        if (status) {
            if(product.count < product.stock) product.count++;
        }
        else {
            if (product.count > 1) {
                product.count--;
            }
        }
        this.totalPrice = this.getTotal(this.basket);
        this.discount = Math.round(this.getTotalDiscount(this.basket) / 100 * 5);
        this.orderService.changeBasket$.next(true);
        localStorage.setItem('basket', JSON.stringify(this.basket));
        this.orderService.stream$.next(this.getCount(this.basket)); 
    }


    removeProduct(product: any): void {
        const index = this.basket.findIndex(prod => prod.id === product.id);
        this.basket.splice(index, 1);
        this.totalPrice = this.getTotal(this.basket);
        this.discount = Math.round(this.getTotalDiscount(this.basket) / 100 * 5);
        this.orderService.changeBasket$.next(true);
        localStorage.setItem('basket', JSON.stringify(this.basket));
        this.orderService.stream$.next(this.getCount(this.basket));
    }

}
