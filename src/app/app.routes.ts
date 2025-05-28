import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile.component';
import { MyReservationsComponent } from './pages/my-reservations.component';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'events', component: HomeComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: 'my-reservations', component: MyReservationsComponent },
  { path: 'profile', component: ProfileComponent },

  {
    path: 'admin/panel',
    canActivate: [roleGuard],
    data: { expectedRole: 'ROLE_ADMIN' },
    loadComponent: () =>
      import('./pages/admin-panel/admin-panel.component').then(
        (m) => m.AdminPanelComponent
      ),
  },
  {
    path: 'agent/panel',
    canActivate: [roleGuard],
    data: { expectedRole: 'ROLE_AGENT' },
    loadComponent: () =>
      import('./pages/agent-panel/agent-panel.component').then(
        (m) => m.AgentPanelComponent
      ),
  },

  { path: '**', redirectTo: '' },
];
