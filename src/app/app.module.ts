import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { EqualValidator } from './shared/equal-validator.directive';
import { HttpClientModule } from '@angular/common/http';

import { AppMaterialModule } from './app-material/app-material.module';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { AlertService } from './services/alert/alert.service';
import { QuestionService } from './services/question/question.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginSignUpDialogComponent } from './dialog/logInSignUp.component';
import { SignUpComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { YodaComponent } from './yoda/yoda.component';
import { AlertComponent } from './directives/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    LoginSignUpDialogComponent,
    EqualValidator,
    YodaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    AngularFontAwesomeModule,
    HttpClientModule,
  ],
  providers: [AuthGuard, AuthService, AlertService, QuestionService],
  bootstrap: [AppComponent],
  entryComponents: [LoginSignUpDialogComponent]
})
export class AppModule { }
