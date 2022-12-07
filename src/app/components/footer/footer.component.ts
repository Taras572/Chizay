import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  block_none: boolean = true;
  d = new Date();
  year = this.d.getFullYear();
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let URL = event.url.substring(1);
        if (URL == 'contacts') {
          this.block_none = false;
        }
        else {
          this.block_none = true;
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
