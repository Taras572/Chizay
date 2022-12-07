import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users/admin-users.component';
import { AdminComponent } from './admin/admin.component';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BasketComponent } from './pages/basket/basket.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { HomeComponent } from './pages/home/home.component';
import { InformationComponent } from './pages/information/information.component';
import { LocationComponent } from './pages/location/location.component';
import { LoginComponent } from './pages/login/login/login.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { NewsComponent } from './pages/news/news.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsPipe } from './pages/products/products.pipe';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ToursComponent } from './pages/tours/tours.component';
import { provideFirebaseApp } from '@angular/fire/app';
import { getApp, initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { provideStorage } from '@angular/fire/storage';
import { TextMaskModule } from 'angular2-text-mask';

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
    ProductsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TextMaskModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideStorage(() => getStorage(getApp(), 'anotherBucket'))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
