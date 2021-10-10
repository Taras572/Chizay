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
    products: Array<IProduct> = [];
    currentCategory: any;
    public productsModal!: IProduct;
    public prodCount: boolean = true;
    

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
                console.log(event.url.substring(9));
            }
        })
    }

    ngOnInit(): void {
        
    }

    loadProduct(categoryName: string): void {
        this.loadProductModal(1);
        if( categoryName == 'all-vine'){
            this.productService.get().subscribe(
                data => {
                    this.products = data;
                    console.log('user page', this.products);
                }, err => {
                    console.log(err);
                }
            )
        }
        else{
            this.productService.getByCategory(categoryName as string).subscribe(
                data => {
                    this.products = data;
                    this.currentCategory = this.products[0].category.path;
                    console.log('user page', this.products);
                }, err => {
                    console.log(err);
                }
            )
        } 
        if(categoryName == 'gift-certificates' || categoryName == 'accessories' || categoryName =='grape-juice'){
            this.prodCount = false;
        }
        else{
            this.prodCount = true;
        }
    }

    loadProductModal(Num:any): void {
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
            products.count++;
        } 
        else if (products.count > 1) {
                products.count--;
            
        }
    }

    addToBasket(products: IProduct): void {
        this.orderService.addToBasket(products);
        products.count = 1;
    }

}
