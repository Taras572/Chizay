import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/shared/models/product/products.model';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';


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
    public orderForm!: UntypedFormGroup;
    public discount: any;
    public product: Array<IProduct> = [];
    public mask = ['+', '(', '3', '8', '0' , ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

    constructor(
        private orderService: OrderService,
        private productService: ProductService,
        private fb: UntypedFormBuilder
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
    }

    private getTotal(products: Array<IProduct>): number {
        return products.reduce((total, prod) => total + (prod.price * prod.count), 0);
    }
    private getTotalDiscount(products: Array<IProduct>): number {
        return products.reduce((total, prod) => total + (prod.price * prod.count), 0);
    }

    addOrder(): void {
        const users = this.orderForm.value;
        let regExp_PHONE = /^\+?[\s\-\(\)0-9]{7,17}$/;
        if (regExp_PHONE.test(users.userPhone)) {
            const order = {
                ...this.orderForm.value,
                products: this.basket,
                totalPrice: this.totalPrice
            }
            this.basket.forEach(value => {
                this.loadProduct(value.id, value.count);
            })
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
    }

    checkUserLogin(): void {

    }

    loadProduct(Num: any, count: number): void {
        this.productService.getByID(Num).subscribe(
            data => {
                this.product[0] = data;
                this.product[0].stock -= count;
                this.updateProduct(Num);
            }, err => {
                console.log(err);
            }
        ) 
    }

    updateProduct(Num: number): void {
        this.productService.update(this.product[0], Num ).subscribe(
            () => {
            }, err => {
                console.log(err);
            }
        );
    }

}
