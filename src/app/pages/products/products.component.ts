import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IProduct } from '../../shared/models/product/products.model';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { OrderService } from 'src/app/shared/services/order/order.service';


@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    public products: Array<IProduct> = [];
    public currentCategory: any;
    public productsModal!: IProduct;
    public prodCount: boolean = true;
    public searchField!: string;
    public randNumOld: number = 0;
    public homeProd: Array<IProduct> = [];
    public recom: boolean = false;
    public basket: Array<IProduct> = [];
    public load_style = false;

    constructor(
        private productService: ProductService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private orderService: OrderService
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const categoryName = event.url.substring(9);
                this.loadProduct(categoryName as string);
            }
        })
    }

    ngOnInit(): void {
        this.getLocalProducts();
        this.orderService.stream$.next(this.getCount(this.basket));
    }

    loadProduct(categoryName: string): void {
        this.loadProductModal(1);
        if (categoryName == 'all-vine') {
            this.productService.get().subscribe(
                data => {
                    this.products = data;
                    this.recom = true;
                    for (let i = 0; i < 4; i++) {
                        this.homeProd.push(this.products[this.getRandomInt(0, this.products.length - 1)]);
                    }
                }, err => {
                    console.log(err);
                }
            )
        }
        else if(categoryName.length > 3) {
            this.productService.getByCategory(categoryName as string).subscribe(
                data => {
                    this.products = data;
                    this.currentCategory = this.products[0].category.path;
                    this.recom = false;
                }, err => {
                    console.log(err);
                }
            )
        }
        if (categoryName == 'gift-certificates' || categoryName == 'accessories' || categoryName == 'grape-juice') {
            this.prodCount = false;
        }
        else {
            this.prodCount = true;
        }
    }

    loadProductModal(Num: any): void {
        this.productService.getByID(Num).subscribe(
            data => {
                this.productsModal = data;
            }, err => {
                console.log(err);
            }
        )
    }

    countProduct(products: IProduct, checker: boolean): void {
        if (checker) {
            if (products.count < products.stock) products.count++;
        }
        else if (products.count > 1) {
            products.count--;
        }
    }

    addToBasket(products: IProduct): void {
        this.orderService.stream$.next(this.getCount(this.basket) + this.productsModal.count);
        this.orderService.addToBasket(products);
        products.count = 1;
    }

    getRandomInt(min: any, max: any): any {
        let randNum = Math.floor(Math.random() * (max - min + 1)) + min;
        if (randNum == this.randNumOld) return this.getRandomInt(min, max);
        this.randNumOld = randNum;
        return randNum;
    }

    private getCount(products: Array<IProduct>) {
        return products.reduce((total, prod) => total + prod.count, 0);
    }

    private getLocalProducts(): void {
        if (localStorage.getItem('basket')) {
            this.basket = JSON.parse(<string>localStorage.getItem('basket'));
        }
    }

}
