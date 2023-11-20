import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent  implements OnInit{
   constructor(private http:ProductService,private router:Router){}
   loggedobj:any={}

   ngOnInit(): void {
    const localdata=localStorage.getItem('shopping')
      if(localdata !=null){
         const parmobj=JSON.parse(localdata)
         this.loggedobj=parmobj
         this.getcartdata(this.loggedobj.custId)
      }
   }

  orderplaced:any=
  {
    "SaleId": 0,
    "CustId": 0,
    "SaleDate": new Date(),
    "TotalInvoiceAmount": 0,
    "Discount": 0,
    "PaymentNaration": "",
    "DeliveryAddress1": "",
    "DeliveryAddress2": "",
    "DeliveryCity": "",
    "DeliveryPinCode": "",
    "DeliveryLandMark": ""
  }
  placeorder(){
    this.orderplaced.orderplaced=this.loggedobj.custId
     this.http.placeorder(this.orderplaced).subscribe((res:any)=>{
             if(res.result){
              console.log("res ====>",res)
              this.http.cartupdated.next(true)
              alert("order Success Placed") 
              this.router.navigate(['product'])
             } else{
               alert(res.message)
             }
     })
  }
  



   cartitem:any[]=[]

   getcartdata(id:any){
    this.http.getaddcartdata(id).subscribe((final:any)=>{
           this.cartitem=final.data
    })
}
}
