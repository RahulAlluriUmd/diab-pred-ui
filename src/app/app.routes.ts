import { Routes } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { SignupComponent } from './_components/signup/signup.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '', redirectTo:'/login', pathMatch:'full'
    },
    // {
    //     path: 'home', component: AppComponent
    // },
    {
        path:'login', component: LoginComponent
    },
    {
        path:'signup', component: SignupComponent
    },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: []
    }
];
