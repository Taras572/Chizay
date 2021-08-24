import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { InformationComponent } from './pages/information/information.component';
import { NewsComponent } from './pages/news/news.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ToursComponent } from './pages/tours/tours.component';
import { LocationComponent } from './pages/location/location.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { ContactsComponent } from './pages/contacts/contacts.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'information', component: InformationComponent},
  {path: 'news', component: NewsComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'tours', component: ToursComponent},
  {path: 'location', component: LocationComponent},
  {path: 'restaurant', component: RestaurantComponent},
  {path: 'contacts', component: ContactsComponent},

  {path: 'admin', component: AdminComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'category'}, 
    {path: 'category', component: AdminCategoryComponent},
    {path: 'product', component: AdminProductComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
