import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IProduct } from '../../shared/models/product/products.model';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    products: Array<IProduct> = [];
    currentCategory: string = '';
    
    constructor(
        private productService: ProductService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                 const categoryName = this.activatedRoute.snapshot.paramMap.get('name'); 
                this.loadProduct(categoryName as string);
                console.log(categoryName);
            }
        })
    }

    ngOnInit(): void {
    }


    loadProduct(categoryName: string): void {
        this.productService.getByCategory(categoryName as string).subscribe(
            data => {
                this.products = data;
                this.currentCategory = this.products[0].category.name;

            }, err => {
                console.log(err);
            }
        )
    }

    /*  loadProduct(): void {
        this.productService.get().subscribe(data => {
            if (data) {
                this.products = data;
            }
            console.log(this.products);
        })
    }  */


}
