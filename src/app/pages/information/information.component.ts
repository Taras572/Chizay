import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
    isShow: number = 1;
    constructor() { }

    ngOnInit(): void {
    }
    BTN(numb: number): void {
        this.isShow = numb;
    }

}
