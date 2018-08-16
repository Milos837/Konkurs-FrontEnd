import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostingListComponent } from './home/posting-list/posting-list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { PostingDetailComponent } from './home/posting-detail/posting-detail.component';
import { ApplyComponent } from './home/apply/apply.component';

const routes: Routes = [
  { path: 'postings', component: PostingListComponent },
  { path: 'postings/:id', component: PostingDetailComponent },
  { path: 'postings/:id/apply', component: ApplyComponent },
  { path: '', redirectTo: '/postings', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
