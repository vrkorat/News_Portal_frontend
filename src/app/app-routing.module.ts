import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ReporterComponent } from './reporter/reporter.component';
import { UserComponent } from './user/user.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'home',component:HomeComponent
  },
  {
    path:'reporter/profile',component:ProfileComponent
  },
  {
    path:'reporter',component:ReporterComponent
  },
  {
    path:'logout',component:LogoutComponent
  },
  {
    path:'admin',component:AdminComponent
  },
  {
    path:'profile',component:ProfileComponent
  },
  {
    path:'user',component:UserComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'home/login',component:LoginComponent
  },
  {
    path:'signup',component:SignupComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
