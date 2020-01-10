import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { RegisterComponent } from './register/register.component';
import { ListMeetingsComponent } from './list-meetings/list-meetings.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { PendingMeetingsComponent } from './pending-meetings/pending-meetings.component';
import { LogoutComponent } from './logout/logout.component';
import { MeetingStatsComponent } from './meeting-stats/meeting-stats.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: ':username/meetings', component: ListMeetingsComponent },
  { path: ':username/meeting/:id', component: MeetingsComponent },
  { path: ':username/meetings/pending', component: PendingMeetingsComponent },
  { path: ':username/meetings/:id/stats', component: MeetingStatsComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
