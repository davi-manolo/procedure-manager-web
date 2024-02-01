import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginService} from "./services/login/login.service";
import {Login} from "./models/login.model";
import {LocalStorageService} from "./services/storage/local-storage.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'procedure-manager-web';

  constructor(private loginService: LoginService, private localStorage: LocalStorageService) {

    //TODO: Remover, apenas para testar o token
    let credentials: Login = { email: 'ethan.johnson@email.com', password: 'tester123' }
    loginService.login(credentials).subscribe(token => {

      localStorage.set('token.expiration', token.expiration)
      localStorage.set('token.bearer', token.bearer)

    })
  }

}
