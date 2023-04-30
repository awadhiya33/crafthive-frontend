import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { AdminComponent } from './admin/admin.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { CartComponent } from './cart/cart.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { GetAllProductComponent } from './get-all-product/get-all-product.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { RegisterComponent } from './Register/Register.component';
import { UserComponent } from './user/user.component';
import { ViewProductDetailsComponent } from './ViewProductDetails/ViewProductDetails.component';
import { AuthGuard } from './_auth/auth.guard';
import { BuyProductResolverService } from './_services/buy-product-resolver.service';
import { ProductResolveService } from './_services/ProductResolve.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent ,canActivate:[AuthGuard],data:{roles:['Admin']} },
  { path: 'user', component: UserComponent, canActivate:[AuthGuard],data:{roles:['User']} },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  {path:'addNewProduct',component:AddNewProductComponent,canActivate:[AuthGuard],data:{roles:['Admin']},
resolve:{
  product:ProductResolveService
}},
{path:'viewProductDetails',component:ViewProductDetailsComponent,
resolve:{
  product:ProductResolveService
}},
  {path:'getAllProduct',component:GetAllProductComponent,canActivate:[AuthGuard],data:{roles:['Admin']}},
  {path:'orderInformation',component:OrderDetailsComponent,canActivate:[AuthGuard],data:{roles:['Admin']}},

  {path:'buyProduct',component:BuyProductComponent,canActivate:[AuthGuard],data:{roles:['User']},
  resolve:{
    productDetails:BuyProductResolverService
  }},
  {path:"orderConfirm",component:OrderConfirmationComponent,canActivate:[AuthGuard],data:{roles:['User']}},
  {path:"myOrders",component:MyOrdersComponent,canActivate:[AuthGuard],data:{roles:['User']}},

  {path:'cart',component:CartComponent,canActivate:[AuthGuard],data:{roles:['User']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
