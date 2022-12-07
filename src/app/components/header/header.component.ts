import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product/products.model';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { IUsLog } from 'src/app/shared/models/users/users.model';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    header_scroll: boolean = false;
    color_scroll: boolean = false;
    text_color: boolean = false;
    shop_head: boolean = false;
    entry: boolean = true;

    usLog: Array<IUsLog> = [{
        usLog: 0,
    }];

   
    public basket: Array<IProduct> = [];
    public countBasket: any = 0;


    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private orderService: OrderService
    ) {

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                let URL = event.url.substring(1);
                let URL2 = event.url.substring(1, 6);
                let PROD = event.url.substring(1, 8);

                if (URL == 'contacts' || URL == 'checkout' || URL == 'news' || URL == 'location' || URL == 'login' || URL == 'shop' || URL == 'basket' || PROD == 'product' || URL2 == 'admin' ||URL == 'my-account') {
                    this.text_color = true;
                }
                else {
                    this.text_color = false;
                }
                if (URL == 'shop' || PROD == 'product' || URL == 'basket' || URL == 'checkout' || URL == 'my-account') {
                    this.shop_head = true;
                }
                else {
                    this.shop_head = false;
                }
            }
        })
    }
    

    ngOnInit(): void {
        this.basketProduct();
        this.visiblBlock();
        this.getLocalProducts();
        this.orderService.stream$.next(this.getCount(this.basket));
        this.LogIn();   
    }

    @HostListener("document:scroll")

    basketProduct(): void {
        this.orderService.stream$.subscribe(val => this.countBasket = val);
    }
    visiblBlock(): void {
        this.orderService.variables$.subscribe(val => this.entry = val);
    }


    scrollfunction() {
        if (scrollY > 5) {
            this.header_scroll = true;
            this.color_scroll = true;
        }
        else {
            this.header_scroll = false;
            this.color_scroll = false;
        }
    }

    
    private getLocalProducts(): void {
        if (localStorage.getItem('basket')) {
            this.basket = JSON.parse(<string>localStorage.getItem('basket'));
        }
    }

    private getCount(products: Array<IProduct>) {
        return products.reduce((total, prod) => total + prod.count, 0);
    }


    LogIn(): void{
        if (localStorage.getItem('usLog')) {
            let User;
            User = JSON.parse(<string>localStorage.getItem('usLog')); 
            if(User[0].usLog>1){
                this.entry = false; 
                this.router.navigate(['/my-account']);
            }
            else if(User[0].usLog==1){
                this.entry = false; 
                this.router.navigate(['/admin']);
            }
        }
    }

}
