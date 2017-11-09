import { Http, HttpModule, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ChartsModule } from 'ng2-charts';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { AppComponent } from './app.component';
//Kendo UI Chart
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
// Import the ButtonsModule
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { SliderModule } from '@progress/kendo-angular-inputs';
//Excel Export

import { AuthGuardService, AuthService, GlobalService, ScopeGuardService, DataService, UserService } from './services/index';
import { CommonService } from './services/common.service';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { PasswordComponent } from './password/password.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './routes';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { HistoryComponent } from './history/history.component';
import { WalletComponent } from './wallet/wallet.component';
import { LogoutComponent } from './logout/logout.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavBarComponent } from './shared/navbar/navbar.component';
import { Errors } from './pages/errors';
import { CategoryDetailComponent } from './invoice/invoiceDetailRow.component';
//import { SignupComponent } from './signup/signup.component';
//import { LandingComponent } from './landing/landing.component';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
    declarations: [
        AppComponent,
        ProfileComponent,
        HomeComponent,
        CallbackComponent,
        PasswordComponent,
        SandboxComponent,
        RegistrationComponent,
        LoginComponent,
        ThankyouComponent,
        InvoiceComponent,
        HistoryComponent,
        WalletComponent,
        LogoutComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        NavBarComponent,
        //SignupComponent,
        //LandingComponent,
        Errors,
        CategoryDetailComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        GridModule,
        ButtonsModule,
        SliderModule,
        PDFModule,
        ExcelModule,
        SlimLoadingBarModule.forRoot(),
        RouterModule.forRoot(routes),
        ToastModule.forRoot(),
        [
            ChartsModule
        ],
    ],
    providers: [
        AuthService,
        AuthGuardService,
        CommonService,
        GlobalService,
        ScopeGuardService,
        DataService,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
