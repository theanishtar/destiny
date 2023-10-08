import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataSrcDirective } from './dataSrcDirective';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// interceptor
import { TokenInterceptor } from './interceptor';
import { loadingInterceptor } from './loadingInterceptor';

// login GG


// user
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
import { GetStartedComponent } from './get-started/get-started.component';
import { WaitForConfirmationComponent } from './get-started/wait-for-confirmation/wait-for-confirmation.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ConfirmSuccessComponent } from './get-started/confirm-success/confirm-success.component';
import { LoadingComponent } from './user/loading/loading.component';
import { VideoCallComponent } from './user/video-call/video-call.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    GetStartedComponent,
    WaitForConfirmationComponent,
    ConfirmSuccessComponent,
    DataSrcDirective,
    LoadingComponent,
    VideoCallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'vi_VN',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
  },
  { provide: HTTP_INTERCEPTORS, useClass: loadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
