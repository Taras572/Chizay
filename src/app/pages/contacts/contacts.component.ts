import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  vine_anim: boolean = false;
  bottle_anim: boolean = false;
  line_vine: boolean = false;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.vine_anim = true, 2200);
    setTimeout(() => this.bottle_anim = true, 900);
    setTimeout(() => this.line_vine = true, 2000);
  }

}
