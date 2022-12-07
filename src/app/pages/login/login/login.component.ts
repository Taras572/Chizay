import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsers, IUsLog } from 'src/app/shared/models/users/users.model';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { IProduct } from 'src/app/shared/models/product/products.model';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public adminUsers: Array<IUsers> = [];
    public usersForm!: UntypedFormGroup;
    public email_color: boolean = false;
    public date_color: boolean = false;
    public password_color: boolean = false;
    public singForm!: UntypedFormGroup;
    public singCount: boolean = true;
    public adminLog: boolean = false;
    validStatus: boolean = false;
    public basket: Array<IProduct> = [];

    usLog: Array<IUsLog> = [{
        usLog: 0,
    }];


    constructor(
        private usersService: UsersService,
        private fb: UntypedFormBuilder,
        private router: Router,
        private orderService: OrderService
    ) { }

    ngOnInit(): void {
        this.loadUsers();
        this.initUsersForm();
        this.initSingIn();
        localStorage.setItem('usLog', JSON.stringify(this.usLog));
    }

    initUsersForm(): void {
        this.usersForm = this.fb.group({
            date: [null, Validators.required],
            email: [null, Validators.required],
            pass: [null, Validators.required],
            second_pass: [null, Validators.required]
        })
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

    createUsers(): void {
        const users = this.usersForm.value;
        this.usersService.create(users).subscribe(
            () => {
                this.loadUsers();
            }, err => {
                console.log(err);
            }
        )
        this.initUsersForm();
    }

    checkUsers(): void {

        //EMAIL
        const users = this.usersForm.value;
        let count = 0;
        let regExp_EMAIL = /^\S{1,}@([a-z]+)\.([a-z]{2,5})$/;

        if (regExp_EMAIL.test(users.email)) {
            this.email_color = false;
        }
        else {
            this.email_color = true;
            count++;
        }

        //date
        if (users.date) {
            this.date_color = false;
        }
        else {
            this.date_color = true;
            count++;
        }

        //PASSWORD
        let regEXP_PASSWORD = /^\w{6,15}$/;

        if (regEXP_PASSWORD.test(users.pass) && users.pass == users.second_pass) {
            this.password_color = false;
        }
        else {
            this.password_color = true;
            count++;
        }

        this.adminUsers.forEach((value) => {
            if (value.email == users.email) {
                count++;
                this.email_color = true;
            }
        });

        if (count == 0) {
            this.createUsers();
        }
        count = 0;;
    }


    initSingIn(): void {
        this.singForm = this.fb.group({
            email: [null, Validators.required],
            pass: [null, Validators.required]
        })
    }

    SingIn(): void {
        const sing = this.singForm.value;

        if (sing.email == 'admin' && sing.pass == 'admin') {
            this.orderService.variables$.next(false);
            this.usLog[0].usLog = this.adminUsers[0].id;
            localStorage.setItem('usLog', JSON.stringify(this.usLog)); 

            this.router.navigate(['/admin']);
        }

        else {
            this.adminUsers.forEach((value) => {
                if (value.email == sing.email && value.pass == sing.pass) {
                    this.orderService.variables$.next(false);
                    this.usLog[0].usLog = value.id;
                    localStorage.setItem('usLog', JSON.stringify(this.usLog));

                    this.router.navigate(['/my-account']);
                }

            });
        }

    }
}


