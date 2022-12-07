import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
    selector: 'app-admin-users',
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

   public adminUsers: Array<any> = [];
    public categoryForm!: UntypedFormGroup;

    constructor(
        private usersService: UsersService,
        
        private fb: UntypedFormBuilder,
    ) { }

    ngOnInit(): void {
        this.loadUsers();
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

    deleteUsers(orders:any): void {
        this.usersService.delete(orders.id as number).subscribe(
            () => {
                this.loadUsers();
            }, err => {
                console.log(err);
            }
        )
    }

}
