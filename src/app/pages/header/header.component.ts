import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";
import { LoginService } from "../../services/login/login.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(protected loginService: LoginService) {}

}
