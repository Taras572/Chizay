import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { InformationComponent } from './pages/information/information.component';
import { NewsComponent } from './pages/news/news.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductsComponent } from './pages/products/products.component';
import { ToursComponent } from './pages/tours/tours.component';
import { LocationComponent } from './pages/location/location.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { BasketComponent } from './pages/basket/basket.component';
import { CheckoutComponent } from './pages/checkout/checkout.component'; 
import { MyAccountComponent } from './pages/my-account/my-account.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users/admin-users.component';


import { LoginComponent } from './pages/login/login/login.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getStorage,provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { ProductsPipe } from './pages/products/products.pipe';



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        InformationComponent,
        NewsComponent,
        ShopComponent,
        ProductsComponent,
        ToursComponent,
        LocationComponent,
        RestaurantComponent,
        ContactsComponent,
        BasketComponent,
        CheckoutComponent,
        MyAccountComponent,
        AdminComponent,
        AdminCategoryComponent,
        AdminProductComponent,
        AdminOrderComponent,
        AdminUsersComponent,
        LoginComponent,
        ProductsPipe,
         
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig )),
        provideStorage(() => getStorage(getApp(), 'anotherBucket'))
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
