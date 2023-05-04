import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: []
})
export class ProductsFormComponent implements OnInit {
  editmode = false;
  form!: FormGroup;
  isSubmitted = false;
  catagories:Category[] = [];
  imageDisplay!: string ;
  currentProductId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      namear: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['',Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      descriptionar: ['', Validators.required],
      richDescription: [''],
      image: ['',Validators.required],
      isFeatured: [false]
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.catagories = categories;

    });
  }

  private _addProduct(product: Product) {
    this.productsService.createProduct(product).then (
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} is created!`,


        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created!'
        });
      }
    );

  }

  private _updateProduct(product: Product) {
    this.productsService.updateProduct(product, this.currentProductId).then(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product is updated!'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not updated!'
        });
      }
    );
  }


  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params?.['id']) {
        this.editmode = true;
        this.currentProductId = params?.['id'];
        this.productsService.getProduct(params?.['id']).subscribe((product) => {
          this.form.patchValue({
            name: product.name,
            namear: product.namear,

            category: product.category?.id,
            brand: product.brand,
            price: product.price,
            countInStock: product.countInStock,
            isFeatured: product.isFeatured,
            description: product.description,
            descriptionar: product.descriptionar,
            richDescription: product.richDescription,
            image: product.image || ''
          });
          this.imageDisplay = product.image || '';
          this.form.controls['image'].setValidators([]);
          this.form.controls['image'].updateValueAndValidity();
          this.form.controls['category'].setValue(product.category);
        });
      }
    });
  }





  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });
    const product: Product = {
      name: this.productForm?.['name'].value,
      namear: this.productForm?.['namear'].value,
      brand: this.productForm?.['brand'].value,
      price: this.productForm?.['price'].value,
      category: this.productForm?.['category'].value,
      countInStock: this.productForm?.['countInStock'].value,
      description: this.productForm?.['description'].value,
      descriptionar: this.productForm?.['descriptionar'].value,
      richDescription: this.productForm?.['richDescription'].value,
      image: this.productForm?.['image'].value||'',
      isFeatured: this.productForm?.['isFeatured'].value
    };

    if (this.editmode) {
      this._updateProduct(product);
    } else {
      this._addProduct(product);
    }
  console.log(this.isSubmitted);

  }
  onCancle() {
    this.location.back();
  }

  onImageUpload(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result?.toString();
        this.form.patchValue({ image: base64 });
        this.form.get('image')?.updateValueAndValidity();
      };
    }
  }


  get productForm() {
    return this.form.controls;
  }
}
