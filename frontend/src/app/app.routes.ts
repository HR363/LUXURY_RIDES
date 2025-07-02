import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { Vehicles } from './pages/vehicles';
import { VehicleDetail } from './pages/vehicle-detail';
import { Dashboard } from './pages/dashboard';
import { Admin } from './pages/admin';
import { About } from './pages/about';
import { FAQ } from './pages/faq';
import { SignIn } from './pages/signin';
import { SignUp } from './pages/signup';
import { Profile } from './pages/profile';
import { ForgotPasswordComponent } from './pages/forgot-password';
import { ResetPasswordComponent } from './pages/reset-password';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'vehicles', component: Vehicles },
  { path: 'vehicles/:id', component: VehicleDetail },
  { path: 'dashboard', component: Dashboard },
  { path: 'admin', component: Admin },
  { path: 'about', component: About },
  { path: 'faq', component: FAQ },
  { path: 'signin', component: SignIn },
  { path: 'signup', component: SignUp },
  { path: 'profile', component: Profile },
  {
    path: 'agent/dashboard',
    loadComponent: () => import('./pages/agent-dashboard').then(m => m.AgentDashboard)
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: '' }
];
