import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListMeetingsComponent } from './list-meetings/list-meetings.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { HttpInterceptorService } from './service/http/http-interceptor.service';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { PendingMeetingsComponent } from './pending-meetings/pending-meetings.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogoutComponent } from './logout/logout.component';
import { MeetingStatsComponent } from './meeting-stats/meeting-stats.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    RegisterComponent,
    ListMeetingsComponent,
    MeetingsComponent,
    PendingMeetingsComponent,
    FooterComponent,
    NavbarComponent,
    LogoutComponent,
    MeetingStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxTypeaheadModule,
    NgSelectModule,
    NgbModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
