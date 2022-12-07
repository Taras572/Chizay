import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/models/category/category.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';


@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
    public adminCategories: Array<ICategory> = [];

    constructor(
        private categoryService: CategoryService,
        private orderService: OrderService,
    ) { }

    ngOnInit(): void {
        this.loadCategories();
    }

    loadCategories(): void {
        this.categoryService.get().subscribe(
            data => {
                this.adminCategories = data;
            }, err => {
                console.log(err);
            }
        )
    }

}
