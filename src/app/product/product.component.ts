import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productArray:any
  allcatrogory:any
  loggedobj:any={}

    constructor(private http:ProductService,private router:Router){
      const localdata=localStorage.getItem('shopping')
      if(localdata !=null){
         const parmobj=JSON.parse(localdata)
         this.loggedobj=parmobj
      }  
    }



ngOnInit(): void {
  this.loadallproduct()
  this.getAllcategory()

 }


 addcart(product:any){

     const obj={
      "CartId": 0,
      "CustId": this.loggedobj.custId,
      "ProductId": product,
      "Quantity": 1,
      "AddedDate": new Date()
    }
    this.http.addotcart(obj).subscribe((final:any)=>{
      if(final.result){
         alert("prodcut add to cart")
         this.http.cartupdated.next(true)
      }else{
          alert(final.message)
      }
    })
 }





    
    loadallproduct(){
      this.http.getAllProduct().subscribe((item:any)=>{
           this.productArray=item.data
      })
   }

   getAllcategory(){
      this.http.getAllcategory().subscribe((item:any)=>{
           this.allcatrogory=item.data

      })
   }

   getallprodcutBy(item:any){
      this.http.getAllprocductBYcategory(item).subscribe((final:any)=>{
          this.productArray=final.data
      })
   }

}

