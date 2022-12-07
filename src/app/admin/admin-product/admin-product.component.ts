import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product/products.model';
import { ICategory } from 'src/app/shared/models/category/category.model';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';

import { getStorage, ref, uploadBytes, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { Storage, StorageInstances } from '@angular/fire/storage';

@Component({
    selector: 'app-admin-product',
    templateUrl: './admin-product.component.html',
    styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

    public adminProducts: Array<IProduct> = [];
    public adminCategories: Array<ICategory> = [];
    private editProductID = 0;
    public productsForm!: UntypedFormGroup;
    public editStatus = false;
    public image: string = '';
    public imageStatus: boolean = false;

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private fb: UntypedFormBuilder,
        defaultApp: FirebaseApp,       // Injects the default FirebaseApp
        allFirebaseApps: FirebaseApps, // Injects an array of all initialized Firebase Apps
        storage: Storage,                      // Injects the default storage instance
        allStorageInstances: StorageInstances, // Injects an array of all the intialized storage instances
    ) { }

    ngOnInit(): void {
        this.initProductForm();
        this.loadCategories();
        this.loadProduct();
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
            image: [null, Validators.required], 
            count: [1],
            stock: [null,Validators.required]
        })
    }

    loadProduct(): void {
        this.productService.get().subscribe(data => {
            if (data) {
                this.adminProducts = data;
            }
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
            name: product.name,
            path: product.path,
            type: product.type,
            description: product.description,
            volume: product.volume,
            alcohol: product.alcohol,
            color: product.color,
            grape: product.grape,
            aroma: product.aroma,
            taste: product.taste,
            price: product.price,
            image: product.image,
            stock: product.stock 
        });
        this.editProductID = product.id as number;
        this.editStatus = true;
        this.imageStatus = true;
        this.image = product.image
    }

    updateProduct(): void {
        const product = this.productsForm.value;
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

    uploadFile(event: any): void {
        const file = event.target.files[0];
        const filePath = `images/${file.name}`;
        const storage = getStorage();
        const storageRef = ref(storage, filePath);

        const task = uploadBytes(storageRef, file).then((snapshot) => {

            getDownloadURL(ref(storage, filePath))
                .then((img) => {
                    this.image = img;
                    this.productsForm.patchValue({
                        image: this.image
                    })
                })
        })

    };


    deleteFile(category?: ICategory): void {
        const pathImage = category?.image || this.image;
        const storage = getStorage();

        // Create a reference to the file to delete
        const desertRef = ref(storage, pathImage);
        deleteObject(desertRef).then(() => {
            this.image = '';
            this.imageStatus = false;
        }).catch((error) => {
           
        });
       
    };

}
