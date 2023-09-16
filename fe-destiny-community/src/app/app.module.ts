import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewsfeedComponent } from './user/newsfeed/newsfeed.component';
import { NavigationComponent } from './user/navigation/navigation.component';
import { ModalComponent } from './user/modal/modal.component';
import { HeaderProfileComponent } from './user/header-profile/header-profile.component';
import { ProfileTimelineComponent } from './user/profile-timeline/profile-timeline.component';
import { PhotosComponent } from './user/photos/photos.component';
import { FollowsComponent } from './user/follows/follows.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { MessageComponent } from './user/message/message.component';
import { SettingComponent } from './user/setting/setting.component';
import { Error404Component } from './error404/error404.component';
import { ContactComponent } from './user/contact/contact.component';
import { HistoryComponent } from './user/history/history.component';
import { NotificationsComponent } from './user/notifications/notifications.component';

//admin
import { SidebarAdminComponent } from './admin/sidebar-admin/sidebar-admin.component';
import { NavbarAdminComponent } from './admin/navbar-admin/navbar-admin.component';
import { IndexAdminComponent } from './admin/index-admin/index-admin.component';
import { PostDetailComponent } from './admin/post-detail/post-detail.component';
import { PostManamentComponent } from './admin/post-manament/post-manament.component';
import { PostReportdetailComponent } from './admin/post-reportdetail/post-reportdetail.component';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
import { UserDetailComponent } from './admin/user-detail/user-detail.component';
import { UserManamentComponent } from './admin/user-manament/user-manament.component';
import { UserReportdetailComponent } from './admin/user-reportdetail/user-reportdetail.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ForgotPasswordComponent,
    NewsfeedComponent,
    NavigationComponent,
    ModalComponent,
    HeaderProfileComponent,
    ProfileTimelineComponent,
    PhotosComponent,
    FollowsComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    MessageComponent,
    SettingComponent,
    Error404Component,
    ContactComponent,
    HistoryComponent,
    NotificationsComponent,
    SidebarAdminComponent,
    NavbarAdminComponent,
    IndexAdminComponent,
    PostDetailComponent,
    PostManamentComponent,
    PostReportdetailComponent,
    ProfileAdminComponent,
    UserDetailComponent,
    UserManamentComponent,
    UserReportdetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
