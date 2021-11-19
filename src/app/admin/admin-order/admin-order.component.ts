import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';



@Component({
    selector: 'app-admin-order',
    templateUrl: './admin-order.component.html',
    styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {

    public adminOrder: Array<any> = [];
    public categoryForm!: FormGroup;

    constructor(
        private categoryService: CategoryService,
        private orderService: OrderService,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.loadOrder();
    }

    loadOrder(): void {
        this.orderService.get().subscribe(
            data => {
                this.adminOrder = data;
                console.log(data);   
            }, err => {
                console.log(err);
            }
        )
    }

    deleteOrder(orders:any): void {
        this.orderService.delete(orders.id as number).subscribe(
            () => {
                this.loadOrder();
            }, err => {
                console.log(err);
            }
        )
    }

}
