import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth/auth.guard';
import { HeaderComponent } from './header/header.component';
import { YodaComponent } from './yoda/yoda.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'yoda/home', component: HomeComponent },
  { path: 'yoda', component: YodaComponent},
  { path: '**', redirectTo: 'yoda'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
