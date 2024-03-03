import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user/user.service";
import { User } from "../../models/user.model";
import { NgOptimizedImage } from "@angular/common";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css'
})
export class UserPanelComponent implements OnInit {

  user: User | null = null;
  profileImageUrl: string | null = environment.apiUrl.concat('/uploads/images/default.png');

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.profileImageUrl = environment.apiUrl.concat('/').concat(user.image);
    })
  }

  getGreetingMessage(): string {
    const currentHour: number = new Date().getHours();
    if (currentHour < 12) {
      return 'Bom dia';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  }

}
