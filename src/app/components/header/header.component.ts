import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order/order.service';



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
                console.log(URL2)
                if (URL == 'contacts' || URL == 'checkout' || URL == 'news' || URL == 'location' || URL == 'login' || URL == 'shop' || URL == 'basket' || PROD == 'product' || URL2 == 'admin') {
                    this.text_color = true;
                }
                else {
                    this.text_color = false;
                }
                if (URL == 'shop' || PROD == 'product' || URL == 'basket' || URL == 'checkout') {
                    this.shop_head = true;
                }
                else {
                    this.shop_head = false;
                }
            }
        })
    }

    ngOnInit(): void {
    }

    @HostListener("document:scroll")

    scrollfunction() {
        let color: any;
        if (scrollY > 5) {
            this.header_scroll = true;
            this.color_scroll = true;
        }
        else {
            this.header_scroll = false;
            this.color_scroll = false;
        }
    }

}
