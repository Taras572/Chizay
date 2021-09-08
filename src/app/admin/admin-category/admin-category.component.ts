import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ICategory } from 'src/app/shared/models/category/category.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';




interface Item {
    name: string,

};

@Component({
    selector: 'app-admin-category',
    templateUrl: './admin-category.component.html',
    styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

    public adminCategories: Array<ICategory> = [];
    public categoryForm!: FormGroup;
    private editCategoryID = 0;
    public editStatus = false;
    public uploadPercent: Observable<number> | undefined | null;
    public image: string = '';
    public imageStatus: boolean = false;
    item$: Observable<import("@angular/fire/firestore").DocumentData[]> | undefined;

    constructor(
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private firestore: Firestore,
        private collection: Firestore
    ) {}


    ngOnInit(): void {
        this.initCategoryForm();
        this.loadCategories();
    }

    initCategoryForm(): void {
        this.categoryForm = this.fb.group({
            name: [null, Validators.required],
            path: [null, Validators.required],
            image: [null]
        })
    }


    loadCategories(): void {
        this.categoryService.get().subscribe(
            data => {
                this.adminCategories = data;
            }, err => {
                console.log(err);
            }
        )
    }

    createCategory(): void {
        const category = this.categoryForm.value;
        this.categoryService.create(category).subscribe(
            () => {
                this.loadCategories();
            }, err => {
                console.log(err);
            }
        )
        this.initCategoryForm();
        this.imageStatus = false;
    }

    deleteCategory(category: ICategory): void {
        this.categoryService.delete(category.id as number).subscribe(
            () => {
                this.loadCategories();
            }, err => {
                console.log(err);
            }
        )
    }

    editCategory(category: ICategory): void {
        this.categoryForm.patchValue({
            name: category.name,
            path: category.path,
            icon: category.image
        });
        this.editCategoryID = category.id as number;
        this.editStatus = true;
    }

    updateCategory(): void {
        const category = this.categoryForm.value;
        this.categoryService.update(category, this.editCategoryID).subscribe(
            () => {
                this.loadCategories();
            }, err => {
                console.log(err);
            }
        );
        this.initCategoryForm();
        this.editStatus = false;
    }
    /* document.getElementById('file-id').addEventListener('change', function(event){
        let file = event.target.files[0];
        BACK.style.backgroundImage = `url(${URL.createObjectURL(file)})` 
        console.log(file);
    }) */
    uploadFile(event: any): void {
        const file = event.target.files[0];
        const filePath = `images/${file.name}`;
        
        console.log(this.firestore, "yy-----");
        const collectio = collection(this.firestore, 'items');
        
        console.log(collectio,"------------------------");
        console.log(this.item$,"---++++++")
        
        
        
        /* const task = this.storage.upload(filePath, file); */
        /*  this.uploadPercent = task.percentageChanges() as Observable<number>;
         task.then(image => {
           this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
             this.icon = url;
             this.categoryForm.patchValue({
               icon: this.icon
             })
             this.imageStatus = true;
             this.uploadPercent = null;
           }); 
         }); */
    }

    deleteFile(category?: ICategory): void {
        /*  const pathImage = category?.icon || this.icon;
         this.storage.storage.refFromURL(pathImage).delete().then(
           () => {
             console.log('Image deleted!');
             this.icon = '';
             this.imageStatus = false;
           }
         ).catch(err => console.log(err));
       } */

    }


}
