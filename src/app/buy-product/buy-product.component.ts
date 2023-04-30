import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { OrderDetails } from '../_model/order-details.model';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

declare var Razorpay:any;
@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {
  isSingleProductCheckout:any;
  productDetails:Product[]=[];
  orderDetails:OrderDetails={
    fullName:'',
    fullAddress:'',
    contactNumber:'',
    alternatenumber:'',
    transactionId:'',
    orderProductQuantityList:[]
  }
  constructor(private activatedRoute:ActivatedRoute,private productSer:ProductService,private router:Router){}
  ngOnInit(): void {
    this.productDetails=this.activatedRoute.snapshot.data['productDetails'];
   this.isSingleProductCheckout= this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");
    this.productDetails.forEach(
      x=>this.orderDetails.orderProductQuantityList.push(
        {productId:x.productId,productQuantity:1}
      )
    );
    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm:NgForm){
    this.productSer.placeOrder(this.orderDetails,this.isSingleProductCheckout).subscribe((data:any)=>{
      console.log(data);
      orderForm.reset();
      Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Your oder has been successfully placed',
            showConfirmButton: false,
            timer: 1500
          })
      this.router.navigate([""]);
    },
    (err)=>{
      console.log(err);
    })
  }
  getQuantityForProduct(productId:number){
    const filterProduct=this.orderDetails.orderProductQuantityList.filter(
      (productQuantity:any)=> productQuantity.productId===productId
    );
    return filterProduct[0].productQuantity;
  }
  getTotal(productId:any,productDiscountedPrice:any){
    const filterProduct=this.orderDetails.orderProductQuantityList.filter(
      (productQuantity:any)=> productQuantity.productId===productId
    );
    return filterProduct[0].productQuantity*productDiscountedPrice;
  }
  onQuantityChanged(quantity:any,productId:any){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct)=>orderProduct.productId===productId
    )[0].productQuantity=quantity;
  }
  getCalculatedGrandTotal(){
    let grandTotal=0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity)=>{
       const price= this.productDetails.filter(product=>product.productId===productQuantity.productId)[0].productDiscountedPrice;
      grandTotal+= price*productQuantity.productQuantity;
      }
    )
    return grandTotal;
  }
  createTransactionandplaceOrder(orderForm:NgForm){
    let amount=this.getCalculatedGrandTotal();
    this.productSer.createTransaction(amount).subscribe((response:any)=>{
      console.log(response);
      this.openTransactionModal(response,orderForm);
    },
    (error)=>{
      console.log(error)
    }
    );
  }
  openTransactionModal(response:any,orderForm:any){
    var options={
      order_Id:response.orderId,
      currency:response.currency,
      key:response.key,
      amount:response.amount,
      name:'CraftHive',
      description:'Your making payment to the crafthive',
      imgage:'https://cdn.searchenginejournal.com/wp-content/uploads/2020/03/the-top-10-most-popular-online-payment-solutions-5e9978d564973.png',
      handler:(response:any)=>{
        if(response != null && response.razorpay_payment_id !=null){
          this.processResponse(response,orderForm);
        }
        else{
          alert("Payement Failed");
        }
        
      },
      prefill:{
        name:'CraftHive',
        email:'crafthive@gmail.com',
        contact:'1234567890'
      },
      notes:{
        address:'Crafthive pvt ltd'
      },
      theme:{
        color:'#F37254'
      }
      };

      var razorPayObject = new Razorpay(options);
      razorPayObject.open();

  }

  processResponse(resp:any,orderForm:any){
    console.log(resp);
    this.orderDetails.transactionId=resp.razorpay_payment_id;
    this.placeOrder(orderForm);
  }

}
