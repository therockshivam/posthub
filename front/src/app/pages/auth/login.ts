import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../service/auth.service';
import { GlobalService } from '../../service/global.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                          
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to Posthub!</div>
                            <span class="text-muted-color font-medium">Sign in to continue</span>
                        </div>
                        <div>
                            <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                            <input pInputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" [(ngModel)]="email" />

                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <p-password id="password1" [(ngModel)]="password" placeholder="Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>

                            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                 <div class="flex items-center">
                                    <p-checkbox [(ngModel)]="checked" id="rememberme1" binary class="mr-2"></p-checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary" routerLink='/auth/forgot-password'>Forgot password?</span>
                            </div>
                            <p-button label="Sign In" (click)="postLogin()" styleClass="w-full"></p-button>
                        </div>
                             <div class="flex items-center justify-center mt-2 mb-8 gap-8">
                                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary" routerLink='/auth/register'>Register</span>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Login {
    email: string = '';

    password: string = '';

    checked: boolean = false;

    constructor(private readonly loginService: AuthService,private readonly globalService: GlobalService,private readonly router:Router) { }

    postLogin() {
        const data = {
            email: this.email,
            password: this.password,
            rememberMe: this.checked
        };
        this.loginService.login(data).subscribe({
            next: (response) => {
        
                this.globalService.setToken(response.token);
                this.globalService.setRefreshToken(response.refreshToken);
                this.router.navigate(['/']);
            },
            error: (error) => {
              
                console.error('Error:', error);
            }
        });
    }
}
