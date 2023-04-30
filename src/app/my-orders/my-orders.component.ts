import { Component, OnInit } from '@angular/core';
import { MyOrderDetails } from '../_model/order.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{
  displayedColumns=["OrderId","Name","Address","Contact No.","Amount","Status"];
  myOrderDetails:MyOrderDetails[]=[];

  constructor(private productSer:ProductService){}
  ngOnInit(): void {
    this.getOrderDetails();
  }
getOrderDetails()
{
  this.productSer.getMyOrders().subscribe(
    (resp:MyOrderDetails[])=>{
      
      this.myOrderDetails=resp;
      console.log(resp);
    },(err)=>{
      console.log(err);
    }
  );
}
}
