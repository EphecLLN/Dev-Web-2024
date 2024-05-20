import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProducersComponent } from './components/producers/producers.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavComponent } from "./components/nav/nav.component";
import { CatchphraseComponent } from './components/catchphrase/catchphrase.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomInterceptor } from './interceptors/custom-interceptor';
import { RegisterProducersComponent } from './components/register-producers/register-producers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductsManagementComponent } from './components/products-management/products-management.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent },
    { path: 'producers', component: ProducersComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'register-producers', component: RegisterProducersComponent },
    { path: 'profil', component: ProfileComponent },
    { path: '**', component: NotFoundComponent },

];

@NgModule({
    declarations: [
        AppComponent,
        ProducersComponent,
        NotFoundComponent,
        LoginComponent,
        SignupComponent,
        CatchphraseComponent,
        NavComponent,
        RegisterProducersComponent,
        DashboardComponent,
        ProductsComponent,
        ProfileComponent,
        ProductsManagementComponent,
        FileUploadComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
