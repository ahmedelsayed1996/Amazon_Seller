import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit {
  products:Product[]=[];
  categories:Category[]=[];
  constructor(
    private categoryServices:CategoriesService,
    private productsService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getProducts();
    this._getCategories()
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      // console.log(products); // Check if the Category objects are being returned with a name property
      this.products= products;
    });
  }
  private _getCategories(){

    this.categoryServices.getCategories().subscribe((catagories) =>{
      console.log(catagories); // Check if the Category objects are being returned with a name property

      this.categories= catagories;

    })}
  
  

  updateProduct(productid: string) {
    this.router.navigateByUrl(`products/form/${productid}`);
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).then(
          () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!'
            });
          }
        );
      }
    });
  }
  
}
