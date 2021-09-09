import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ICategory } from 'src/app/shared/models/category/category.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';



@Component({
    selector: 'app-admin-order',
    templateUrl: './admin-order.component.html',
    styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {

    public adminOrder: Array<any> = [];
    public categoryForm!: FormGroup;
    private editCategoryID = 0;

    constructor(
        private categoryService: CategoryService,
        private orderService: OrderService,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.loadCategories();
        
    }

    loadCategories(): void {
        this.orderService.get().subscribe(
            data => {
                this.adminOrder = data;
                console.log(this.adminOrder[1].products[0].name);
            }, err => {
                console.log(err);
            }
        )
    }

    deleteCategory(orders:any): void {
        this.orderService.delete(orders.id as number).subscribe(
            () => {
                this.loadCategories();
            }, err => {
                console.log(err);
            }
        )
    }

}
