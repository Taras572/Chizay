import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../../models/product/products.model';


@Injectable({
   providedIn: 'root'
})
export class OrderService {
   public changeBasket$ = new Subject<boolean>();
   public stream$ = new Subject<number>();

   public variables$ = new Subject<boolean>();

   public countBasket: any;
   private resourceUrl = environment.BACKEND_URL;
   private api = {
      orders: `${this.resourceUrl}orders`
   };
   
   constructor(
      private http: HttpClient,
      
   ) { }

   get(): Observable<any> {
      return this.http.get<any>(this.api.orders);
   }

   create(order: any): Observable<any> {
      return this.http.post<any>(this.api.orders, order);
   }
   
   delete(id: number): Observable<any> {
      return this.http.delete<any>(`${this.api.orders}/${id}`);
   }

   addToBasket(product: IProduct): void {
      let basket: Array<IProduct> = [];
      if (localStorage.getItem('basket')) {
         basket = JSON.parse(<string>localStorage.getItem('basket'));
         if (basket.some(prod => prod.id === product.id)) {
            const index = basket.findIndex(prod => prod.id === product.id);
            basket[index].count += product.count;
         } else {
            basket.push(product);
         }
      } else {
         basket.push(product);
      }
      localStorage.setItem('basket', JSON.stringify(basket));
      this.changeBasket$.next(true);
      product.count = 1;
   }

}
