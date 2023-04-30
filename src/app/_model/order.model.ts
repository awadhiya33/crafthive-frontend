import { Product } from "./product.model";

export interface MyOrderDetails{

oredrId:number;
orderFullName:string;
orderFullOrder:string;
orderContactNumber:string;
alternateNumber:string;
orderStatus:string;
orderAmount:number;
product:Product;
user:any;
}