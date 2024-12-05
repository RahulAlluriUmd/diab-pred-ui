import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { DialogModule } from '../../dialog/dialog.module';
import { DialogComponent } from '../../dialog/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../models/dialogData';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DialogModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  hidePassword = true;
  loading = false;

  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // rememberMe: [false]
    })
  }

  form: any = {
    username: null,
    password: null
  };
  invalidPassword = false;
  unknownUser = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  onSubmit(): void {

    if (this.loginForm.valid) {
      this.loading = true;
      const user_details = this.authService.getItem(this.loginForm.value.email)

      // move below validation to auth service
      if( user_details != null || user_details != ''){
        if (user_details.password === this.loginForm.value.password) {
          this.authService.isLoggedInSubject.next(user_details)
          setTimeout(() => {

            this.loading = false;
            
            // Navigate to dashboard after successful login
            this.router.navigate(['/predictionForm']);
          }, 1500);
        }
        else {
          this.invalidPassword = true;
          this.openDialog()
        }
      }
      else {
        this.unknownUser = true;
      }
      
    }

    // const { username, password } = this.form;

    // this.authService.login(username, password).subscribe({
    //   next: data => {
    //     this.userService.saveUser(data);

    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     this.roles = this.userService.getUser().roles;
    //     this.reloadPage();
    //   },
    //   error: err => {
    //     this.errorMessage = err.error.message;
    //     this.isLoginFailed = true;
    //   }
    // });
  }

  openDialog(): void { 
    let dialogRef = this.dialog.open(DialogComponent, { 
      width: '250px', 
      data: this.createDialogData()
    });

    dialogRef.afterClosed().subscribe(result => { 
      this.loading = false;
      console.log(result)
    }); 
  }

  createDialogData():DialogData {
    return new DialogData('Warning', 'Invalid Password..! Please click ok and retry', 'OK')
  }

  reloadPage(): void {
    window.location.reload();
  }

  onForgotPassword(): void {

  }

}
