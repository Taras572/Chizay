import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product/products.model';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    products: Array<IProduct> = [];
    homeProd: Array<IProduct> =[];
    randNumOld: number = 0;
    numbArr: Array<any> = [];
    season!:string;
    date = new Date;

    constructor(
        private productService: ProductService
    ) { }

    ngOnInit(): void {
        let month = this.date.getMonth()+1;
        if(month >=3 && month <=5){
            this.season = 'bg_spring';
        }
        else if(month >=6 && month <=8){
            this.season = 'bg_summer';
        }
        else if(month >=9 && month <=11){
            this.season = 'bg_autumn';
        }
        else{
            this.season = 'bg_winter';
        }

        this.loadProduct();
    }

    getRandomInt(min: any, max: any): any {
        let randNum = Math.floor(Math.random() * (max - min + 1)) + min;
        if (randNum == this.randNumOld) return this.getRandomInt(min, max);
        this.randNumOld = randNum;
        return randNum;
    }

    loadProduct(): void {
        this.productService.get().subscribe(data => {
            if (data) {
                this.products = data;
                for (let i = 0; i < 4; i++) {
                    this.homeProd.push(this.products[this.getRandomInt(0,this.products.length-1)]);
                }
            }
        })
    }

}
