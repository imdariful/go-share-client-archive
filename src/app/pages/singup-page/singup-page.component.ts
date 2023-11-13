import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-singup-page',
  templateUrl: './singup-page.component.html',
})
export class SingupPageComponent {
  error: string | undefined;

  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private location: Location,
    private toast: HotToastService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      type: 1,
    });
  }

  // Get the user's data
  async getUserData(): Promise<void> {
    if (!this.registrationForm.valid) {
      console.log('No Valid ');
      this.toast.error('Please fill all the fields');
      return;
    }

    try {
      const userData = this.registrationForm.value;

      const res: any = await this.auth.signUp(userData);
      console.log(res);

      if (res.token) {
        this.registrationForm.reset();
        this.location.historyGo(-2);
      }
    } catch (error: any) {
      console.error(error);
      this.toast.error(error?.message);
    }
  }
}
