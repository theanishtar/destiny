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

// user
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewsfeedComponent } from './user/newsfeed/newsfeed.component';
import { NavigationComponent } from './user/navigation/navigation.component';
import { HeaderProfileComponent } from './user/header-profile/header-profile.component';
import { ProfileTimelineComponent } from './user/profile-timeline/profile-timeline.component';
import { PhotosComponent } from './user/photos/photos.component';
import { FollowsComponent } from './user/follows/follows.component';
import { ChangePasswordComponent } from './user/modal/change-password/change-password.component';
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
//admin / comboboxsearch
//npm install --save @ng-select/ng-select
import { NgSelectModule } from '@ng-select/ng-select';
import { SidebarModeratorComponent } from './moderator/sidebar-moderator/sidebar-moderator.component';
import { NavbarModeratorComponent } from './moderator/navbar-moderator/navbar-moderator.component';
import { PostReportComponent } from './moderator/post-report/post-report.component';
import { PostReportDetailModeratorComponent } from './moderator/post-report-detail/post-report-detail.component';
import { ProfileComponent } from './moderator/profile/profile.component';
import { UserReportComponent } from './moderator/user-report/user-report.component';
import { UserReportModeratorDetailComponent } from './moderator/user-report-detail/user-report-detail.component';
import { ForbiddenWordComponent } from './moderator/forbidden-word/forbidden-word.component';

import { DatePipe } from '@angular/common';
import { APP_INITIALIZER } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from './user/service/message.service';
import { ProfileService } from './user/service/profile.service';

// import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { CommentComponent } from './user/modal/comment/comment.component';
import { CreatePostComponent } from './user/modal/create-post/create-post.component';
import { ImagesComponent } from './user/modal/images-post/images.component';
import { ModalService } from './user/service/modal.service';
import { DetailPostComponent } from './user/modal/detail-post/detail-post.component';
import { EditPostComponent } from './user/modal/edit-post/edit-post.component';
import { ChangeEmailComponent } from './user/modal/change-email/change-email.component';
import { ChangeConfirmComponent } from './user/modal/change-email/change-confirm/change-confirm.component';

export function appInitializer(cookieService: CookieService, messageService: MessageService, sender: any,modalService:ModalService, profileService: ProfileService, dataProfileTimeline: any) {
  return () => {
    if (cookieService.get("full_name") != '') {
      messageService.loadDataSender().subscribe(() => {
        sender = JSON.parse(JSON.stringify(messageService.getSender()));
        modalService.connectToComment(sender.user_id);
        messageService.connectToChat(sender.user_id);
      
      });
    }
  };
}

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
    VideoCallComponent,
    SidebarModeratorComponent,
    NavbarModeratorComponent,
    PostReportComponent,
    PostReportDetailModeratorComponent,
    ProfileComponent,
    UserReportComponent,
    UserReportModeratorDetailComponent,
    ForbiddenWordComponent,
    CommentComponent,
    CreatePostComponent,
    ImagesComponent,
    DetailPostComponent,
    EditPostComponent,
    ChangeEmailComponent,
    ChangeConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // AngularFireModule.initializeApp(firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    TranslateModule.forRoot({
      defaultLanguage: 'vi_VN',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: loadingInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [CookieService, MessageService, ProfileService,ModalService],
      multi: true,
    },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
