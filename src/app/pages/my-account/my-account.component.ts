import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

    public adminUsers: Array<any> = [];
    block: boolean = false;

    count!: number;
    constructor(
        private usersService: UsersService,
        private orderService: OrderService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.loadUsers();
        if (localStorage.getItem('usLog')) {
            let User;
            User = JSON.parse(<string>localStorage.getItem('usLog')); 
            this.count = User[0].usLog-1;
        }

    }

    Exit(): void {
        this.orderService.variables$.next(true);
        this.router.navigate(['/login']);
        localStorage.setItem('usLog', JSON.stringify([]));
    }

    loadUsers(): void {
        this.usersService.get().subscribe(
            data => {
                this.adminUsers = data;  
            }, err => {
                console.log(err);
            }
        )
    }

   

    

}
