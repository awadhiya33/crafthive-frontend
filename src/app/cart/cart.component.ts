import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'DiscountedPrice','Action'];
  cartDetails=[];
  constructor(private productSer:ProductService,private router:Router){}

  ngOnInit(): void {
    this.getCartDetails();
    
  }
  delete(cartId:any)
  {
    console.log(cartId);
    this.productSer.deleteCartItem(cartId).subscribe(
      (resp)=>{
        console.log(resp);
        this.getCartDetails();
      }, (err)=>{
        console.log(err);
      }
    );
    
  }
  getCartDetails(){
    this.productSer.getCartDetails().subscribe((data:any)=>{
      console.log(data);
      this.cartDetails=data;
    },(error)=>{
      console.log(error);
    })

  }
  checkout(){
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout:false,id:0
    }]);

    // this.productSer.getProductDetails(false,0).subscribe(
    //   (data)=>{
    //     console.log(data);
    //   },(error)=>{
    //     console.log(error);
    //   }
    // )
  }

}
