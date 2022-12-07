import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/shared/models/category/category.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { Observable } from 'rxjs';
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { Storage, StorageInstances } from '@angular/fire/storage';


@Component({
    selector: 'app-admin-category',
    templateUrl: './admin-category.component.html',
    styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
    public adminCategories: Array<ICategory> = [];
    public categoryForm!: UntypedFormGroup;
    private editCategoryID = 0;
    public editStatus = false;
    public uploadPercent: Observable<number> | undefined | null;
    public image: string = '';
    public imageStatus: boolean = false;
    public imageUrl!: any;
    public imgt!: string;


    constructor(
        private categoryService: CategoryService,
        private fb: UntypedFormBuilder,
        defaultApp: FirebaseApp,       // Injects the default FirebaseApp
        allFirebaseApps: FirebaseApps, // Injects an array of all initialized Firebase Apps
        storage: Storage,                      // Injects the default storage instance
        allStorageInstances: StorageInstances, // Injects an array of all the intialized storage instances
    ) { }


    ngOnInit(): void {
        this.initCategoryForm();
        this.loadCategories();
    }

    initCategoryForm(): void {
        this.categoryForm = this.fb.group({
            name: [null, Validators.required],
            path: [null, Validators.required],
            image: [null, Validators.required]
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
            image: category.image
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


    uploadFile(event: any): void {
        const file = event.target.files[0];
        const filePath = `images/${file.name}`;
        const storage = getStorage();
        const storageRef = ref(storage, filePath);

        const task = uploadBytes(storageRef, file).then((snapshot) => {

            getDownloadURL(ref(storage, filePath))
                .then((img) => {
                    this.image = img;
                    this.categoryForm.patchValue({
                        image: this.image
                    })
                })
        })

    } 


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
       
    }

}



