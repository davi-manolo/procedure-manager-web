import { Routes } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { authGuard } from "./services/guards/auth.guard";
import { StartedComponent } from "./pages/started/started.component";
import { AboutComponent } from "./pages/about/about.component";
import { preventLoginGuard } from "./services/guards/prevent-login.guard";

export const routes: Routes = [

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [preventLoginGuard] },
  { path: 'started', component: StartedComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }

];
