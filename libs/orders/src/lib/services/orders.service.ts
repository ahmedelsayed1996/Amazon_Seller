// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Order } from '../models/order';
// import { collection, collectionData, doc, docData ,Firestore, setDoc, deleteDoc, addDoc } from '@angular/fire/firestore';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrdersService {

//   constructor(private firestore: Firestore) {}

//   getOrders(): Observable<Order[]> {
//     const $ordersRef = collection(this.firestore, "order");
//     return collectionData($ordersRef, {idField: "id"}) as Observable<Order[]>;
//   }
//   // getOrders(): Observable<Order[]> {
//   //   const $ordersRef = collection(this.firestore, "order");
//   //   return collectionData($ordersRef, {idField: "id"}).pipe(
//   //     catchError(error => {
//   //       console.log('Error fetching orders:', error);
//   //       return throwError('Failed to fetch orders. Please try again later.');
//   //     })
//   //   ) as Observable<Order[]>;
//   // }

//   getOrder(orderId: string): Observable<Order> {
//     const $orderRef = doc(this.firestore, "order/" + orderId);
//     return docData($orderRef, {idField: "id"}) as Observable<Order>;
//   }

//   createOrder(order: Order): Promise<any> {
//     const $ordersRef = collection(this.firestore, "order");
//     return addDoc($ordersRef, order);
//   }

//   updateOrder(order: Order): Promise<any> {
//     const $orderRef = doc(this.firestore, "order/" + order.id);
//     return setDoc($orderRef, order);
//   }

//   deleteOrder(orderId: string): Promise<any> {
//     const $orderRef = doc(this.firestore, "order/" + orderId);
//     return deleteDoc($orderRef);
//   }
  
// }
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { collection, collectionData, doc, docData, Firestore, setDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private firestore: Firestore) {}

  getOrders(): Observable<Order[]> {
    const $ordersRef = collection(this.firestore, "order");
    return collectionData($ordersRef, {idField: "id"}) as Observable<Order[]>;
  }

  getOrder(orderId: string): Observable<Order> {
    const $orderRef = doc(this.firestore, "order/" + orderId);
    return docData($orderRef, {idField: "id"}) as Observable<Order>;
  }

  createOrder(order: Order): Promise<any> {
    const $ordersRef = collection(this.firestore, "order");
    return addDoc($ordersRef, order);
  }

  updateOrder(order: Order): Promise<any> {
    const $orderRef = doc(this.firestore, "order/" + order.id);
    return setDoc($orderRef, order);
  }

  deleteOrder(orderId: string): Promise<any> {
    const $orderRef = doc(this.firestore, "order/" + orderId);
    return deleteDoc($orderRef);
  }

  getOrdersCount(): Observable<number> {
    const $ordersRef = collection(this.firestore, "order");
    return collectionData($ordersRef, {idField: "id"}).pipe(
      map((orders: Order[]) => orders.length)
    );
  }

  getTotalSales(): Observable<number> {
    const $ordersRef = collection(this.firestore, "order");
    return collectionData($ordersRef, {idField: "id"}).pipe(
      map((orders: Order[]) => {
        let totalSales = 0;
        orders.forEach(order => {
          totalSales += order.totalprice||0;
        });
        return totalSales;
      })
    );
  }
}
