import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';
import { Error } from './error';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
     { path: 'register', component: RegisterComponent },
    { path: 'login', component: Login },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password/:token', component: ResetPasswordComponent },
] as Routes;
