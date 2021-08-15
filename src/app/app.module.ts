import { NgModule, CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { InformationComponent } from './pages/information/information.component';
import { NewsComponent } from './pages/news/news.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ToursComponent } from './pages/tours/tours.component';
import { LocationComponent } from './pages/location/location.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ServicesComponent } from './shared/services/services.component';
import { StylesComponent } from './shared/styles/styles.component';
import { BasketComponent } from './pages/basket/basket.component';

import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    InformationComponent,
    NewsComponent,
    ShopComponent,
    ToursComponent,
    LocationComponent,
    RestaurantComponent,
    ContactsComponent,
    ServicesComponent,
    StylesComponent,
    BasketComponent,
    AdminProductComponent,
    AdminCategoryComponent,
    AdminOrdersComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class AppModule { }
