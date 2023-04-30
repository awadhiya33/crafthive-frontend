import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Product } from '../_model/product.model';
import { ImageProcessingServiceService } from '../_services/image-processing-service.service';
import { ProductService } from '../_services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
 productDetails:Product[]=[];
 pageNum:number=0;
 showButton:boolean=false;

  constructor(private productSer:ProductService,private imgps:ImageProcessingServiceService,private router:Router){}

  ngOnInit(): void {
   
     this.getAllProducts();
  }
  public getAllProducts(searchKey:string=''){
    this.productSer.getAllProducts(this.pageNum,searchKey)
    .pipe(
      map((x:Product[],i)=>x.map((product:Product)=>this.imgps.createImage(product)))
    )
    .subscribe((data:Product[])=>{
      console.log(data);
      if(data.length==12){
        this.showButton=true;
      }
      data.forEach(p=> this.productDetails.push(p));
    },
    (error:HttpErrorResponse)=>{
      console.log(error);
    }
    );
  }
  loadMore(){
    this.pageNum=this.pageNum+1;
    this.getAllProducts();
  }
  viewProductDetails(productId:number){
    console.log(productId);
    this.router.navigate(['/viewProductDetails',{productId:productId}]);
  }
  searchByKeyword(searchKeyword:any){
    console.log(searchKeyword);
    this.pageNum=0;
    this.productDetails=[];
    this.getAllProducts(searchKeyword);
  }
}
