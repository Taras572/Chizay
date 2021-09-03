import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/shared/models/product/products.model';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
    selector: 'app-admin-product',
    templateUrl: './admin-product.component.html',
    styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
    
    public adminProducts: Array<IProduct> = [];
    public productsForm!: FormGroup;
    public editStatus = false;
    public image: string = '';
    public imageStatus: boolean = false;
    
    constructor(
        private productService: ProductService,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.initProductForm();
        this.loadProduct();
    }
    btn(): void{
        console.log(this.productsForm);
    }

    initProductForm(): void {
        this.productsForm = this.fb.group({
          category: ['Select category', Validators.required], 
          name: [null, Validators.required],
          type: [null, Validators.required],
          description: [null, Validators.required],
          volum: [null, Validators.required],
          alcohol: [null, Validators.required],
          color: [null, Validators.required],
          grape: [null, Validators.required],
          aroma: [null, Validators.required],
          taste: [null, Validators.required],
          price: [null, Validators.required],
          image: [null, Validators.required], 
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
        /* this.imageStatus = false; */
        console.log(this.productsForm.value);
      }

    deleteProduct(product: IProduct): void {
       
    }
    
    editProduct(product: IProduct): void {
       
    }

}
