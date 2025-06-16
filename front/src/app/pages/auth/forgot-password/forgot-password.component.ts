import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-forgot-password',
  imports: [ButtonModule, InputTextModule, FormsModule,ReactiveFormsModule, RouterModule, RippleModule, AppFloatingConfigurator,CommonModule,ToastModule],
  standalone:true,
    providers: [ MessageService],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
forgotPasswordForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService,private readonly messageService: MessageService) {
    // Initialize form with FormBuilder
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      const emailPayload = this.forgotPasswordForm.value;
      this.authService.sendForgotPasswordRequest(emailPayload).subscribe({
         next: (response) => {
           this.messageService.add({ severity: 'success', summary: 'Password reset link sent!', detail: response.msessage, life: 3000 });
        },
         error: (error) => {
             this.messageService.add({ severity: 'error', summary: 'Error sending password reset link!', detail: error, life: 3000 });
        }
    });
    } else {
      this.forgotPasswordForm.markAllAsTouched(); 
    }
  }

}
