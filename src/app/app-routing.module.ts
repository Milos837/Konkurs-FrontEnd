import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostingListComponent } from './home/posting-list/posting-list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { PostingDetailComponent } from './home/posting-detail/posting-detail.component';
import { ApplyComponent } from './home/apply/apply.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { AdminPostingListComponent } from './admin/admin-posting-list/admin-posting-list.component';
import { AdminFilterService } from '../services/filters/admin-filter.service';

const routes: Routes = [
  { path: 'postings', component: PostingListComponent },
  { path: 'postings/:id', component: PostingDetailComponent },
  { path: 'postings/:id/apply', component: ApplyComponent },
  { path: 'admin/postings', component: AdminPostingListComponent, canActivate: [AdminFilterService] },
  { path: 'login', component: LoginFormComponent },
  { path: '', redirectTo: '/postings', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
