import { Component, OnInit , HostListener} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    header_scroll:boolean = false;
    
    constructor() { }

    ngOnInit(): void {
    }
    @HostListener("document:scroll")
    scrollfunction(){
        if(scrollY>5){
            this.header_scroll = true;
        }
        else{
            this.header_scroll = false;
        }
    }
    
    
   
}
