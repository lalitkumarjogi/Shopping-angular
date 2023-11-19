import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartupdated: Subject<boolean>=new Subject<boolean>() 
  constructor(private http:HttpClient) { }

getAllProduct(){
     return  this.http.get('https://freeapi.miniprojectideas.com/api/amazon/GetAllProducts')
}
getAllcategory(){
     return  this.http.get('https://freeapi.miniprojectideas.com/api/amazon/GetAllCategory')
}
getAllprocductBYcategory(id:any){
     return  this.http.get('https://freeapi.miniprojectideas.com/api/amazon/GetAllProductsByCategoryId?id='+id)
}
RegisterCustomer(user:any):Observable<any>{
      return this.http.post('https://freeapi.miniprojectideas.com/api/amazon/RegisterCustomer',user)
}

Loginuser(user:any){
      return this.http.post('https://freeapi.miniprojectideas.com/api/amazon/Login',user)
}


 addotcart(obj:any):Observable<any>{
       return this.http.post('https://freeapi.miniprojectideas.com/api/amazon/AddToCart',obj)
 }


 getaddcartdata(id:any){
       return this.http.get('https://freeapi.miniprojectideas.com/api/amazon/GetCartProductsByCustomerId?id='+id)
 }
remove(cartid:any){
      return this.http.get('https://freeapi.miniprojectideas.com/api/amazon/DeleteProductFromCartById?id='+cartid)
}


placeorder(order:any){
      return this.http.post('https://freeapi.miniprojectideas.com/api/amazon/PlaceOrder',order)
}
}
