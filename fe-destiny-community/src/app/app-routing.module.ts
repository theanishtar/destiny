import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

import { HomeComponent } from './home/home.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { Error404Component } from './error404/error404.component';
import { WaitForConfirmationComponent } from './get-started/wait-for-confirmation/wait-for-confirmation.component';
import { ConfirmSuccessComponent } from './get-started/confirm-success/confirm-success.component';

// User
import { NewsfeedComponent } from './user/newsfeed/newsfeed.component';
import { ProfileTimelineComponent } from './user/profile-timeline/profile-timeline.component';
import { PhotosComponent } from './user/photos/photos.component';
import { FollowsComponent } from './user/follows/follows.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { MessageComponent } from './user/message/message.component';
import { SettingComponent } from './user/setting/setting.component';
import { ContactComponent } from './user/contact/contact.component';
import { HistoryComponent } from './user/history/history.component';
import { NotificationsComponent } from './user/notifications/notifications.component';
import { VideoCallComponent } from './user/video-call/video-call.component';

// Admin
import { IndexAdminComponent } from './admin/index-admin/index-admin.component';
import { PostDetailComponent } from './admin/post-detail/post-detail.component';
import { PostManamentComponent } from './admin/post-manament/post-manament.component';
import { PostReportdetailComponent } from './admin/post-reportdetail/post-reportdetail.component';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
import { UserDetailComponent } from './admin/user-detail/user-detail.component';
import { UserManamentComponent } from './admin/user-manament/user-manament.component';
import { UserReportdetailComponent } from './admin/user-reportdetail/user-reportdetail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: GetStartedComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'wait-confirm', component: WaitForConfirmationComponent },
  { path: 'regisauth', component: ConfirmSuccessComponent }, 

  // user
  // { path: 'newsfeed', component: NewsfeedComponent, canActivate: [authGuard]},
  { path: 'newsfeed', component: NewsfeedComponent},
  { path: 'profile', component: ProfileTimelineComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'follow', component: FollowsComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'message', component: MessageComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'video-call', component: VideoCallComponent },

  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/index-admin/index-admin.component').then(m => m.IndexAdminComponent),
  //   canActivate: [authGuard], 
  // },
  { path: 'admin', component: IndexAdminComponent, canActivate: [authGuard] },
  { path: 'admin/postdetail', component: PostDetailComponent, canActivate: [authGuard] },
  { path: 'admin/postmanament', component: PostManamentComponent, canActivate: [authGuard] },
  { path: 'admin/postreportdetail', component: PostReportdetailComponent, canActivate: [authGuard] },
  { path: 'admin/profileadmin', component: ProfileAdminComponent, canActivate: [authGuard] },
  { path: 'admin/userdetail', component: UserDetailComponent, canActivate: [authGuard] },
  { path: 'admin/usermanament', component: UserManamentComponent, canActivate: [authGuard] },
  { path: 'admin/userreportdetail', component: UserReportdetailComponent, canActivate: [authGuard] },

  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
