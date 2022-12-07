import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users/admin-users.component';
import { AdminComponent } from './admin/admin.component';
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
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ToursComponent } from './pages/tours/tours.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'information', component: InformationComponent },
  { path: 'news', component: NewsComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'product/:name', component: ProductsComponent },
  { path: 'tours', component: ToursComponent },
  { path: 'location', component: LocationComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'login', component: LoginComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'my-account', component: MyAccountComponent },

  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'product' },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'order', component: AdminOrderComponent },
      { path: 'users', component: AdminUsersComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
