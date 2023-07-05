import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ParentComponent } from './parent/parent.component';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // {path:'',component:ParentComponent},
  { path: '', redirectTo: '/parent/login', pathMatch: 'full' },
  {path:'parent',component:ParentComponent,canActivate:[AuthGuard]},
  {path:'',
      children:[
        {path:'parent/login',component:LoginComponent},
        {path:'parent/register',component:RegisterComponent}
      ]},
  // {path:'login',component:LoginComponent},
  // {path:'register',component:RegisterComponent}
  {path:'viewdetails/:id',component:ViewdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
