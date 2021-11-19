import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/shared/models/product/products.model';
import { OrderService } from 'src/app/shared/services/order/order.service';


@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    public basket: Array<IProduct> = [];
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
        
    }

    initOrderForm(): void {
        this.orderForm = this.fb.group({
            userName: [null, Validators.required],
            userSecondName: [null, Validators.required],
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
            this.discount = Math.round(this.getTotalDiscount(this.basket)/100 * 5);


        }

        console.log(this.basket);
    }

    private getTotal(products: Array<IProduct>): number {
        return products.reduce((total, prod) => total + (prod.price * prod.count), 0);
    }
    private getTotalDiscount(products: Array<IProduct>): number {
        return products.reduce((total, prod) => total + (prod.price * prod.count), 0);
    }

    addOrder(): void {
        const order = {
            ...this.orderForm.value,
            products: this.basket,
            totalPrice: this.totalPrice
        }
        this.orderService.create(order).subscribe(
            () => {
                this.basket = [];
                localStorage.removeItem('basket');
                this.orderService.changeBasket$.next(true);
            }, err => {
                console.log(err);

            }
        )
    }

    checkUserLogin(): void {

    }

}
