import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';

import { AppComponent } from './app.component';
import { PostingListComponent } from './home/posting-list/posting-list.component';
import { PostingDetailComponent } from './home/posting-detail/posting-detail.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ApplyComponent } from './home/apply/apply.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { AdminPostingListComponent } from './admin/admin-posting-list/admin-posting-list.component';
import { AdminPostingApplicationsComponent } from './admin/admin-posting-applications/admin-posting-applications.component';
import { AdminApplicationDetailComponent } from './admin/admin-application-detail/admin-application-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PostingListComponent,
    PostingDetailComponent,
    NavbarComponent,
    NotFoundComponent,
    ApplyComponent,
    LoginFormComponent,
    AdminPostingListComponent,
    AdminPostingApplicationsComponent,
    AdminApplicationDetailComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule
  ],
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'sr'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
