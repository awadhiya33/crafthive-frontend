import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FileHandle } from '../_model/file-handle.model';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  isNewProduct:boolean=true;
  product:Product={
    productId:0,
    productName:"",
    productDesc:"",
    productDiscountedPrice:0,
    productActualPrice:0,
    productImages:[]
  }
  constructor(private productService:ProductService,private sanitizer:DomSanitizer,private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.product=this.activatedRoute.snapshot.data['product'];
    if(this.product && this.product.productId){
      this.isNewProduct=false;
    }
  }


  addProduct(productForm:any){
    const productFormData= this.prepareFormData(this.product);
    this.productService.addProduct(productFormData).subscribe(
      (data:Product)=>{
        if(!this.isNewProduct){
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Product has been Successfully updated',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Product has been Successfully added',
            showConfirmButton: false,
            timer: 1500
          })
        }
        productForm.reset();
        this.product.productImages=[];
      },
      (error:HttpErrorResponse)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Add at least one image to add product',
          
        })
        console.log(error);
      }
    )
  }
  prepareFormData(product:Product):FormData{
    const formData=new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)],{type:'application/json'})
    );
    for(var i=0;i<product.productImages.length;i++){
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      )
    }
    return formData;
  }
  onFileSelected(event: any){
    if(event.target.files){
      const file=event.target.files[0];

      const fileHandle:FileHandle={
        file:file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.productImages.push(fileHandle);
    }
  }
  removeImages(i:number)
  {
this.product.productImages.splice(i,1);
  }
}
