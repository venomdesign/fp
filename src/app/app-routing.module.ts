import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from "./profile/profile.component";
import { HomeComponent } from "./home/home.component";
import { PasswordComponent } from "./password/password.component";
import { SandboxComponent } from "./sandbox/sandbox.component";
import { LogoutComponent } from './logout/logout.component';
import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { ThankyouComponent } from './thankyou/thankyou.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { CallbackComponent } from "./callback/callback.component";
import { Errors } from "./pages/errors";

//TEST
//import { SignupComponent } from './signup/signup.component';
//import { LandingComponent } from './landing/landing.component';


const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'password', component: PasswordComponent },
    { path: 'sandbox', component: SandboxComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'invoice', component: InvoiceComponent },
    { path: 'thankyou', component: ThankyouComponent },
    //{ path: 'signs', component: SignupComponent },
    //{ path: 'lands', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'error', component: Errors },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
