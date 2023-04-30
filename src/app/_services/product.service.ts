import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 

  constructor(private httpclient:HttpClient) { }

  public createTransaction(amount:any){
    return this.httpclient.get("http://localhost:9090/createTransaction/"+amount);
  }

  public markAsDelivered(OrderId:any){
    return this.httpclient.get("http://localhost:9090/markOrderAsDelivered/"+OrderId);
  }
  public getAllOrderDetailsForAdmin(status:string):Observable<MyOrderDetails[]>{
    return this.httpclient.get<MyOrderDetails[]>("http://localhost:9090/getAllOrderDetails/"+status);

  }
  public getMyOrders():Observable<MyOrderDetails[]>{
    return this.httpclient.get<MyOrderDetails[]>("http://localhost:9090/getOrderDetails");

  }
  public deleteCartItem(cartId: any){
    return this.httpclient.delete("http://localhost:9090/deleteCartItem/"+cartId);
  }

  public addProduct(product:FormData){
    return this.httpclient.post<Product>("http://localhost:9090/addNewProduct",product);
  }
  public getAllProducts(pageNum:number,searchKeyword:string=''){
    return this.httpclient.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber="+pageNum+"&searchKey="+searchKeyword);
  }
  public getProductDetailsById(productId:any){
    return this.httpclient.get<Product[]>("http://localhost:9090/getProductDetailsById/"+productId);
  }
  public deleteProduct(productId:number){
    return this.httpclient.delete("http://localhost:9090/deleteProductDetails/"+productId);
  }
  public getProductDetails(isSingleProductCheckout:any,productId:any){
    return this.httpclient.get<Product[]>("http://localhost:9090/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }
  public placeOrder(orderDetails:OrderDetails,isCartCheckout:any){
    console.log(orderDetails);
    return this.httpclient.post("http://localhost:9090/placeOrder/"+isCartCheckout,orderDetails);
  }
  public addToCart(productId:any){
    return this.httpclient.get("http://localhost:9090/addToCart/"+productId);
  }
  public getCartDetails(){
    return this.httpclient.get("http://localhost:9090/getCartDetails");
  }
}
