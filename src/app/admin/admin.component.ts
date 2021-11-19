import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { Router } from '@angular/router';
import { IUsLog } from 'src/app/shared/models/users/users.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private usLog: Array<IUsLog> = [{
    usLog: 0,
  }];
  constructor(
    private orderService:OrderService,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  Exit(): void {
    this.orderService.variables$.next(true);
    this.router.navigate(['/login']);
    localStorage.setItem('usLog', JSON.stringify([]));
}

}
