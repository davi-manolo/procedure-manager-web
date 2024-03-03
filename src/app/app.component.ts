import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { registerLocaleData } from "@angular/common";
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }]
})
export class AppComponent {

  title: string = 'procedure-manager-web';

}
