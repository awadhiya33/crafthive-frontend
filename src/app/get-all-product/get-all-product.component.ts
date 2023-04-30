import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ShowProductImageDialogComponent } from '../show-product-image-dialog/show-product-image-dialog.component';
import { Product } from '../_model/product.model';
import { ImageProcessingServiceService } from '../_services/image-processing-service.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-get-all-product',
  templateUrl: './get-all-product.component.html',
  styleUrls: ['./get-all-product.component.css']
})
export class GetAllProductComponent implements OnInit{
  showButton=false;
  showTable:boolean=false;
  pageNum:number=0;
  productDetails:Product[]=[];
  displayedColumns:string[]=['ProductId','productName','description','productActualPrice','productDiscountedPrice','Actions'];

  constructor(private productSer:ProductService,public imagesDialog:MatDialog,private imgps:ImageProcessingServiceService,private router:Router){}
  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(searchKeyword:string=''){

    this.showTable=false;
    this.productSer.getAllProducts(this.pageNum,searchKeyword)
    .pipe(
      map((x:Product[],i)=>x.map((product:Product)=>this.imgps.createImage(product)))
    )
    .subscribe((data:Product[])=>{
      console.log(data);
      data.forEach(product=>this.productDetails.push(product));
      this.showTable=true;
      
      if(data.length==12){
        this.showButton=true;
      }else{
        this.showButton=false;
      }
      
    },
    (error:HttpErrorResponse)=>{
      console.log(error);
    }
    );
  }

  deleteProduct(productId:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productSer.deleteProduct(productId).subscribe((data:any)=>{
            
          this.getAllProducts();
        },
        (error:HttpErrorResponse)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You cant delete the ordered items',
            
          }),
          console.log(error);
        }
        ),
        Swal.fire(
          
          'Deleted!',
          'Your product has been deleted.',
          'success'
        )
      }
    })
    
    
  }
  showImages(product:Product){
    console.log(product);
    this.imagesDialog.open(ShowProductImageDialogComponent,{
      data:{
        images:product.productImages
      },
      height:'500px',
      width:'800px'
    });
  }
  loadMore(){
    this.pageNum=this.pageNum+1;
    this.getAllProducts();
  }

  editProductDetails(productId:any){
    console.log(productId);
    this.router.navigate(['/addNewProduct',{productId:productId}]);
  }

  searchByKeyword(searchKeyword:any){
    console.log(searchKeyword);
    this.pageNum=0;
    this.productDetails=[];
    this.getAllProducts(searchKeyword);
  }
}
