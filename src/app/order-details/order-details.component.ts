import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MyOrderDetails } from '../_model/order.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
 
  displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address','Contact No.','Status','Action'];
  status:string="All";
  dataSource:any=[];

  constructor(private productSer:ProductService){}

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }
  getAllOrderDetailsForAdmin(StatusParameter:string)
  {
    this.productSer.getAllOrderDetailsForAdmin(StatusParameter).subscribe(
      (resp)=>{
        this.dataSource=resp;
        console.log(resp);
      },(error)=>
      {
        console.log(error);
      }
    );
   
  }
  markAsDelivered(OrderId:any){
    console.log(OrderId);
    this.productSer.markAsDelivered(OrderId).subscribe(
      (resp)=>{
        this.getAllOrderDetailsForAdmin(this.status);
        console.log(resp);
      },(err)=>{
        console.log(err);
      }
    );

  }
}
