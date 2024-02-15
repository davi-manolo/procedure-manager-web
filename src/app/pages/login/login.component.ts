import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginService } from "../../services/login/login.service";
import { LocalStorageService } from "../../services/storage/local-storage.service";
import { Login } from "../../models/login.model";
import { NgClass, NgIf, NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  credentials: Login | null = null;
  errorMessage: string | null = null;
  loginForm!: FormGroup

  constructor(
    private loginService: LoginService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(this.credentials ? this.credentials.email : '', [Validators.required]),
      password: new FormControl(this.credentials ? this.credentials.password : '', [Validators.required]),
    });
  }

  async login() {
    if (!this.loginForm.invalid) {
      this.loginService.login(this.loginForm.value).subscribe(
        {
          next: (token) => {
            this.localStorage.set('token.expiration', token.expiration);
            this.localStorage.set('token.bearer', token.bearer);
            this.localStorage.set('user.email', this.loginForm.get('email')?.value)
            this.router.navigate(['/dashboard']);
          },
          error: () => this.errorMessage = 'Email ou senha inválidos!'
        }
      );
    }
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

}
