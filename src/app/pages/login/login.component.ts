import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginService } from "../../services/login/login.service";
import { LocalStorageService } from "../../services/storage/local-storage.service";
import { Login } from "../../models/login.model";
import { NgClass, NgIf, NgOptimizedImage } from "@angular/common";
import { UserService } from "../../services/user/user.service";
import { mergeMap } from "rxjs";
import { Token } from "../../models/token.model";
import { User } from "../../models/user.model";

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
    private userService: UserService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(this.credentials ? this.credentials.email : '', [Validators.required]),
      password: new FormControl(this.credentials ? this.credentials.password : '', [Validators.required]),
    });
  }

  async login(): Promise<void> {
    if (!this.loginForm.invalid) {
      this.loginService.login(this.loginForm.value).pipe(
        mergeMap((token: Token) => {
          this.localStorage.set('token.expiration', token.expiration);
          this.localStorage.set('token.bearer', token.bearer);
          this.localStorage.set('user.email', this.loginForm.get('email')?.value);

          return this.userService.getUser();
        })
      ).subscribe(
        {
          next: (user: User): void => {
            this.localStorage.set('user.id', user.userId);
            this.router.navigate(['/dashboard']);
          },
          error: (): string => this.errorMessage = 'Email ou senha inválidos!'
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
