import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-ViewProductDetails',
  templateUrl: './ViewProductDetails.component.html',
  styleUrls: ['./ViewProductDetails.component.css']
})
export class ViewProductDetailsComponent implements OnInit {

  constructor(private productService:ProductService,private sanitizer:DomSanitizer,private activatedRoute:ActivatedRoute,private router:Router) { }

  selectedImage=0;
  product:Product={
    productId:0,
    productName:"",
    productDesc:"",
    productDiscountedPrice:0,
    productActualPrice:0,
    productImages:[]
  };
  ngOnInit() {
    this.product=this.activatedRoute.snapshot.data['product'];
    
  }
  changImage(i:number){
    this.selectedImage=i;
  }
  buyProduct(productId:number){
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout:true,id:productId
    }]);
  }
  addToCart(productId:number){
    this.productService.addToCart(productId).subscribe((data:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'added to cart!',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(data);
    },(error)=>{
      console.log(error);
    })
  }
}
