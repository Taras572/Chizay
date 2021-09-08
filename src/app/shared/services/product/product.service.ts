import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../../models/product/products.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private resourceUrl = environment.BACKEND_URL;

    private api = {
        products: `${this.resourceUrl}products`
    }

    constructor(
        private http: HttpClient
    ) { }

    get(): Observable<any> {
        return this.http.get<any>(this.api.products);
    }

    getByCategory(categoryName: string): Observable<any> {
        return this.http.get<any>(`${this.api.products}?category.path=${categoryName}`);
    }

    getByID(id: number): Observable<any> {
        return this.http.get<any>(`${this.api.products}/${id}`);
    }

    create(product: IProduct): Observable<any> {
        return this.http.post<any>(this.api.products, product);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.api.products}/${id}`);
    }

    update(product: IProduct, id: number): Observable<any> {
        return this.http.patch<any>(`${this.api.products}/${id}`, product);
    }

}
