import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";
import { LoginService } from "../../services/login/login.service";
import { UserPanelComponent } from "../user-panel/user-panel.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    UserPanelComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(protected loginService: LoginService) {}

}
