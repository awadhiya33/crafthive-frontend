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
    return this.httpclient.get("https://crafthive-backend.onrender.com/createTransaction/"+amount);
  }

  public markAsDelivered(OrderId:any){
    return this.httpclient.get("https://crafthive-backend.onrender.com/markOrderAsDelivered/"+OrderId);
  }
  public getAllOrderDetailsForAdmin(status:string):Observable<MyOrderDetails[]>{
    return this.httpclient.get<MyOrderDetails[]>("https://crafthive-backend.onrender.com/getAllOrderDetails/"+status);

  }
  public getMyOrders():Observable<MyOrderDetails[]>{
    return this.httpclient.get<MyOrderDetails[]>("https://crafthive-backend.onrender.com/getOrderDetails");

  }
  public deleteCartItem(cartId: any){
    return this.httpclient.delete("https://crafthive-backend.onrender.com/deleteCartItem/"+cartId);
  }

  public addProduct(product:FormData){
    return this.httpclient.post<Product>("https://crafthive-backend.onrender.com/addNewProduct",product);
  }
  public getAllProducts(pageNum:number,searchKeyword:string=''){
    return this.httpclient.get<Product[]>("https://crafthive-backend.onrender.com/getAllProducts?pageNumber="+pageNum+"&searchKey="+searchKeyword);
  }
  public getProductDetailsById(productId:any){
    return this.httpclient.get<Product[]>("hhttps://crafthive-backend.onrender.com/getProductDetailsById/"+productId);
  }
  public deleteProduct(productId:number){
    return this.httpclient.delete("https://crafthive-backend.onrender.com/deleteProductDetails/"+productId);
  }
  public getProductDetails(isSingleProductCheckout:any,productId:any){
    return this.httpclient.get<Product[]>("https://crafthive-backend.onrender.com/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }
  public placeOrder(orderDetails:OrderDetails,isCartCheckout:any){
    console.log(orderDetails);
    return this.httpclient.post("hhttps://crafthive-backend.onrender.com/placeOrder/"+isCartCheckout,orderDetails);
  }
  public addToCart(productId:any){
    return this.httpclient.get("https://crafthive-backend.onrender.com/addToCart/"+productId);
  }
  public getCartDetails(){
    return this.httpclient.get("https://crafthive-backend.onrender.com/getCartDetails");
  }
}
