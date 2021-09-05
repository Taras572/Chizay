import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product/products.model';
import { ICategory } from 'src/app/shared/models/category/category.model';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
    selector: 'app-admin-product',
    templateUrl: './admin-product.component.html',
    styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

    public adminProducts: Array<IProduct> = [];
    public adminCategories: Array<ICategory> = [];
    private editProductID = 0;
    public productsForm!: FormGroup;
    public editStatus = false;
    public image: string = '';
    public imageStatus: boolean = false;

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.initProductForm();
        this.loadCategories();
        this.loadProduct();
    }
    btn(): void {
        console.log(this.productsForm);
    }

    initProductForm(): void {
        this.productsForm = this.fb.group({
            category: ['Select category', Validators.required],
            name: [null, Validators.required],
            path: [null, Validators.required],
            type: [null, Validators.required],
            description: [null, Validators.required],
            volume: [null, Validators.required],
            alcohol: [null, Validators.required],
            color: [null, Validators.required],
            grape: [null, Validators.required],
            aroma: [null, Validators.required],
            taste: [null, Validators.required],
            price: [null, Validators.required],
            /* image: [null, Validators.required],  */
            count: [1]
        })
    }

    loadProduct(): void {
        this.productService.get().subscribe(data => {
            if (data) {
                this.adminProducts = data;
            }
            console.log(this.adminProducts);
        })
    }
    loadCategories(): void {
        this.categoryService.get().subscribe(data => {
            this.adminCategories = data;
        }, err => {
            console.log(err);
        }
        )
    }

    createProduct(): void {
        const product = this.productsForm.value;
        this.productService.create(product).subscribe(
            () => {
                this.loadProduct();
            }, err => {
                console.log(err);
            }
        )
        this.initProductForm();
        this.imageStatus = false;  
        console.log(this.productsForm.value);
    }

    deleteProduct(product: IProduct): void {
        this.productService.delete(product.id as number).subscribe(
            () => {
                this.loadProduct();
            }, err => {
                console.log(err);
            }
        )
    }
    editProduct(product: IProduct): void {
        this.productsForm.patchValue({
            category: [product.category.name],
            name: [product.name],
            path: [product.path],
            type:[product.type],
            description: [product.description],
            volume:[product.volume],
            alcohol:[product.alcohol],
            color:[product.color],
            grape:[product.grape],
            aroma:[product.aroma],
            taste:[product.taste],
            price: [product.price]
            /* image: [product.image] */
        });
        this.editProductID = product.id as number;
        this.editStatus = true;
        this.imageStatus = true;
        this.image = product.image
    }

    updateProduct(): void {
        const product = this.productsForm.value;
        console.log(product);
        this.productService.update(product, this.editProductID).subscribe(
          () => {
            this.loadProduct();
          }, err => {
            console.log(err);
          }
        );
        this.initProductForm();
        this.editStatus = false;
        this.imageStatus = false;
      }


}
