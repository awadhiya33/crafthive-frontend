import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
//import { Observable, of } from 'rxjs';
import { map, Observable, of } from 'rxjs';

import { Product } from '../_model/product.model';
import { ImageProcessingServiceService } from './image-processing-service.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product>{

constructor(private productService:ProductService,private imageProcessingService:ImageProcessingServiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product>{
   const id=route.paramMap.get("productId");

   if(id){
       return this.productService.getProductDetailsById(id).pipe(
        map( (p:any) => this.imageProcessingService.createImage(p)) 
        );
   }
   else{
      return of(this.getProductDetails());
   }
  }

  getProductDetails(){
    return {
      productId:0,
      productName:"",
      productDesc:"",
      productDiscountedPrice:0,
      productActualPrice:0,
      productImages:[]
    };
  }

}
