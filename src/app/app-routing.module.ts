import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './Components/user-management/user-management.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user-management', component: UserManagementComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

