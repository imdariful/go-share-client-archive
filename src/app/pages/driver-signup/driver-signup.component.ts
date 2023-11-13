import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-driver-signup',
  templateUrl: './driver-signup.component.html',
  styleUrls: ['./driver-signup.component.scss'],
})
export class DriverSignupComponent {
  error: string | undefined;

  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nid: ['', [Validators.required, Validators.minLength(8)]],
      dl: ['', [Validators.required, Validators.minLength(6)]],
      birth: ['', [Validators.required, Validators.minLength(6)]],
      exp: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async getUserData() {
    try {
      if (this.registrationForm.valid) {
        const userData = this.registrationForm.value;
        userData.type = 2;
        const res = await this.auth.signUp(userData);

        if (res.token) {
          console.log('iddd', res.token);
          this.registrationForm.reset();
          this.router.navigate(['/dashboard/profile']);
        }
      }
    } catch (error: any) {
      this.error = error.message;
      throw new Error(`Failed to get user data: ${error.message}`);
    }
  }
}
