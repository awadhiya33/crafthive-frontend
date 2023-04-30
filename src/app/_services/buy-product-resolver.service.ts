import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingServiceService } from './image-processing-service.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]> {

  constructor(private productSer:ProductService,private imgser:ImageProcessingServiceService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    const id=route.paramMap.get("id");
    const isSingleProductCheckout=route.paramMap.get("isSingleProductCheckout");
    return this.productSer.getProductDetails(isSingleProductCheckout,id)
    .pipe(
      map(
        (x:Product[],i)=>x.map((product:Product)=>this.imgser.createImage(product))
      )
    );
  }
}
