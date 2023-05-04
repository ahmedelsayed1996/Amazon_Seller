import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { collection, collectionData, doc, docData, Firestore, setDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private firestore: Firestore) {}

  getCategories(): Observable<Category[]> {
    let $categoriesRef = collection(this.firestore, "category");
    return collectionData($categoriesRef, {idField: "id"}) as Observable<Category[]>;
  }

  getCategory(categoryId: string): Observable<Category> {
    let $categoryRef = doc(this.firestore, "category/" + categoryId);
    return docData($categoryRef, {idField: "id"}) as Observable<Category>;
  }

  createCategory(category: Category): Promise<any> {
    const categoryId = uuidv4();
    category.id = categoryId;
    let $categoriesRef = collection(this.firestore, "category");
    return addDoc($categoriesRef, category);
  }

  updateCategory(category: Category): Promise<any> {
    let $categoryRef = doc(this.firestore, "category/" + category.id);
    return setDoc($categoryRef, category);
  }

  deleteCategory(categoryId: string): Promise<any> {
    let $categoryRef = doc(this.firestore, "category/" + categoryId);
    return deleteDoc($categoryRef);
  }
}
