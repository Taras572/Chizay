import { Injectable } from '@angular/core';
import { ICategory } from '../../models/category/category.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private resourceUrl = environment.BACKEND_URL;

    private api = {
        category: `${this.resourceUrl}category`
    }

    constructor(
        private http: HttpClient
    ) { }

    get(): Observable<any> {
        return this.http.get<any>(this.api.category);
    }

    create(category: ICategory): Observable<any> {
        return this.http.post<any>(this.api.category, category);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.api.category}/${id}`);
    }

    update(category: ICategory, id: number): Observable<any> {
        return this.http.patch<any>(`${this.api.category}/${id}`, category);
    }
}
