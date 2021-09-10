import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/shared/models/product/products.model';
import { OrderService } from 'src/app/shared/services/order/order.service';


@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

    public basket: Array<IProduct> = [];
    // public userName!: string;
    // public userPhone!: string;
    // public userCity!: string;
    // public userStreet!: string;
    // public userHouse!: string;
    // public userComment!: string;

    public totalPayment!: string;
    public totalPrice = 0;
    public countBusket = 0;
    public orderForm!: FormGroup;
    public discount: any;

    constructor(
        private orderService: OrderService,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.initOrderForm();
        this.getLocalProducts();
        console.log(this.discount);
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
            this.discount = this.getTotalDiscount(this.basket)/100*5;
            this.countBusket = this.getCount(this.basket);

        }
        
        console.log(this.basket);
    }

    private getTotal(products: Array<IProduct>): number {
        return products.reduce((total, prod) => total + (prod.price * prod.count), 0);
    }
    private getTotalDiscount(products: Array<IProduct>): number {
        return Math.round(products.reduce((total, prod) => total + (prod.price * prod.count), 0));
    }
    private getCount(products: Array<IProduct>): number {
        return products.reduce((total, prod) => total + prod.count, 0);

    }


    productCount(product: IProduct, status: boolean): void {
        if (status) {
            product.count++;

        }
        else {
            if (product.count > 1) {
                product.count--;

            }
        }
        this.totalPrice = this.getTotal(this.basket);
        this.discount = this.getTotalDiscount(this.basket)/100*5;
        this.countBusket = this.getCount(this.basket);
        this.orderService.changeBasket$.next(true);
        localStorage.setItem('basket', JSON.stringify(this.basket));

    }

    removeProduct(product: IProduct): void {
        if (confirm('Are you sure?')) {
            const index = this.basket.findIndex(prod => prod.id === product.id);
            this.basket.splice(index, 1);
            this.totalPrice = this.getTotal(this.basket);
            this.discount = this.getTotalDiscount(this.basket)/100*5;
            this.countBusket = this.getCount(this.basket);
            this.orderService.changeBasket$.next(true);
            localStorage.setItem('basket', JSON.stringify(this.basket));
        }
    }

    

}
