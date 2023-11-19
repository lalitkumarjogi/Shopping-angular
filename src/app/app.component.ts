import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  cartitem:any[]=[]
  constructor(private http:ProductService){
  }
  ngOnInit(): void {
      const localdata=localStorage.getItem('shopping')
      if(localdata !=null){
         const parmobj=JSON.parse(localdata)
         this.loggedobj=parmobj
         this.getcartdata(this.loggedobj.custId)
      }
      this.http.cartupdated.subscribe((res:boolean)=>{
         if(res){
          this.getcartdata(this.loggedobj.custId)

         } 
      })

  }
  
  getcartdata(id:any){
    this.http.getaddcartdata(id).subscribe((final:any)=>{
           this.cartitem=final.data
    })
}

remove(id:any){
   this.http.remove(id).subscribe((item:any)=>{
     console.log(item)
   if(item.result){
     alert("Item Removed")      
    this.getcartdata(this.loggedobj.custId)
   }
    else{
       alert(item.message)
    }
   })
 }

  
  Loginuser=
  {
    "UserName": "string",
    "UserPassword": "string"
  }
  RegisterCustomer=
  {
    "CustId": 0,
    "Name": "string",
    "MobileNo": "string",
    "Password": "string"
  }

loggedobj:any={}


















  Registeruser(){
       this.http.RegisterCustomer(this.RegisterCustomer).subscribe((user:any)=>{
              if(user.result)
              {
                this.loggedobj=user.data
                 alert("user creation done")
              }
              else{
                alert(user.message)

              }
       })
  }
  loginperson(){
       this.http.Loginuser(this.Loginuser).subscribe((user:any)=>{
              if(user.result){
                this.loggedobj=user.data
                 alert("user Login success")
                 localStorage.setItem("shopping",JSON.stringify(user.data))
                 this.getcartdata(this.loggedobj.custId)
              }
              else{
                alert(user.message)

              }
       })
  }

  
  login(){
     var login=document.getElementById('login')
   if( login != null){
     login.style.display="block"
   }
  }

  register(){
     var login=document.getElementById('register')
   if( login != null){
     login.style.display="block"
   }
  }

  closelogin(){
    var login=document.getElementById('login')
    if( login != null){
      login.style.display="none"
    }
  }
  closeregister(){
    var login=document.getElementById('register')
    if( login != null){
      login.style.display="none"
    }
  }
}
