import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PostingListComponent } from './home/posting-list/posting-list.component';
import { PostingDetailComponent } from './home/posting-detail/posting-detail.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ApplyComponent } from './home/apply/apply.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PostingListComponent,
    PostingDetailComponent,
    NavbarComponent,
    NotFoundComponent,
    ApplyComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
