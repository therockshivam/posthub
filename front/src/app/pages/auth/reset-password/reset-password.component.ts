import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../service/auth.service';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule,ReactiveFormsModule, RouterModule, RippleModule, AppFloatingConfigurator,CommonModule,ToastModule,PasswordModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  providers: [ MessageService]
})
export class ResetPasswordComponent {
resetPasswrodForm: FormGroup;
token: string = '';

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService,private readonly messageService: MessageService,private readonly activatedRoute: ActivatedRoute) {
    // Initialize form with FormBuilder
this.resetPasswrodForm = this.fb.group({
  password: ['', [Validators.required, Validators.minLength(8)]],
  confirmPassword: ['', [Validators.required]]
}, { validators: this.passwordsMatchValidator });

  }

  ngOnInit(): void {
   this.token = this.activatedRoute.snapshot.paramMap.get('token') ?? '';
this.varifyToken();
  }

  passwordsMatchValidator(group: FormGroup) {
  const pass = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pass === confirm ? null : { passwordMismatch: true };
}

varifyToken() {
  this.authService.varifyToken(this.token).subscribe({
    next: (response) => {
      this.messageService.add({ severity: 'success', summary: 'Token varified successfully!', detail: response.message, life: 3000 });
    },
    error: (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error varifying token !', detail: error, life: 3000 });
    }
  });
}

  resetPassword() {
    if (this.resetPasswrodForm.valid) {
      const passwordPayload = this.resetPasswrodForm.value;
      this.authService.resetPassword(this.token,passwordPayload).subscribe({
         next: (response) => {
           this.messageService.add({ severity: 'success', summary: 'Password reset successfully!', detail: response.msessage, life: 3000 });
        },
         error: (error) => {
             this.messageService.add({ severity: 'error', summary: 'Error reseting password !', detail: error, life: 3000 });
        }
    });
    } else {
      this.resetPasswrodForm.markAllAsTouched(); 
    }
  }
}
