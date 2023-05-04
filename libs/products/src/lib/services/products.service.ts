// import { Injectable } from '@angular/core';
// import { Observable, combineLatest, map } from 'rxjs';
// import { Product } from '../models/product';
// import { collection, collectionData, doc, docData, Firestore, setDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
// import { Category } from '../models/category';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductsService {

//   constructor(private firestore: Firestore) {}

//   // getProducts(): Observable<Product[]> {
//   //   let $productsRef = collection(this.firestore, "products");
//   //   return collectionData($productsRef, {idField: "id"}) as Observable<Product[]>;
//   // }
//   ////////////////////////////////Modifying//////////////////////////
//   getProducts(): Observable<Product[]> {
//     let $productsRef = collection(this.firestore, "products");
//     let $products = collectionData($productsRef, {idField: "id"}) as Observable<Product[]>;

//     let $categoriesRef = collection(this.firestore, "category");
//     let $categories = collectionData($categoriesRef, {idField: "id"}) as Observable<Category[]>;

//     return combineLatest([$products, $categories]).pipe(
//       map(([products, categories]) => {
//         return products.map(product => {
//           let category = categories.find(category => category.id === product.category);
//           return {
//             ...product,
//             category
//           };
//         });
//       })
//     );
//   }
//   createProduct(productData: Product): Promise<any> {
//     let $productsRef = collection(this.firestore, "products");
//     return addDoc($productsRef, productData);
//   }

//   getProduct(productId: string): Observable<Product> {
//     let $productRef = doc(this.firestore, "products/" + productId);
//     return docData($productRef, {idField: "id"}) as Observable<Product>;
//   }

//   updateProduct(productData: Product, productId: string): Promise<any> {
//     let $productRef = doc(this.firestore, "products/" + productId);
//     return setDoc($productRef, productData);
//   }

//   deleteProduct(productId: string): Promise<any> {
//     let $productRef = doc(this.firestore, "products/" + productId);
//     return deleteDoc($productRef);
//   }
  
// }
import { Injectable } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { Product } from '../models/product';
import { collection, collectionData, doc, docData, Firestore, setDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: Firestore) {}

  // getProducts(): Observable<Product[]> {
  //   let $productsRef = collection(this.firestore, "products");
  //   return collectionData($productsRef, {idField: "id"}) as Observable<Product[]>;
  // }
  ////////////////////////////////Modifying//////////////////////////
  getProducts(): Observable<Product[]> {
    let $productsRef = collection(this.firestore, "products");
    let $products = collectionData($productsRef, {idField: "id"}) as Observable<Product[]>;

    let $categoriesRef = collection(this.firestore, "category");
    let $categories = collectionData($categoriesRef, {idField: "id"}) as Observable<Category[]>;

    return combineLatest([$products, $categories]).pipe(
      map(([products, categories]) => {
        return products.map(product => {
          let category = categories.find(category => category.id === product.category);
          return {
            ...product,
            category
          };
        });
      })
    );
  }
  
  createProduct(productData: Product): Promise<any> {
    let $productsRef = collection(this.firestore, "products");
    return addDoc($productsRef, productData);
  }

  getProduct(productId: string): Observable<Product> {
    let $productRef = doc(this.firestore, "products/" + productId);
    return docData($productRef, {idField: "id"}) as Observable<Product>;
  }

  updateProduct(productData: Product, productId: string): Promise<any> {
    let $productRef = doc(this.firestore, "products/" + productId);
    return setDoc($productRef, productData);
  }

  deleteProduct(productId: string): Promise<any> {
    let $productRef = doc(this.firestore, "products/" + productId);
    return deleteDoc($productRef);
  }

  getProductsCount(): Observable<number> {
    const $productsRef = collection(this.firestore, "products");
    return collectionData($productsRef).pipe(map((products: Product[]) => products.length));
  }
}  
