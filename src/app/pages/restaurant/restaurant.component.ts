import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-restaurant',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
    date = new Date();
    season!: string;
    back_img_season!: string;
    constructor() { }

    ngOnInit(): void {
        let month = this.date.getMonth() + 1;
        if (month >= 3 && month <= 5) {
            this.season = 'spring';
        }
        else if (month >= 6 && month <= 8) {
            this.season = 'summer';
        }
        else if (month >= 9 && month <= 11) {
            this.season = 'autumn';
            this.back_img_season = 'autumn_img'
        }
        else {
            this.season = 'winter';
        }
    }

}
