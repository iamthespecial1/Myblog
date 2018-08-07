import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { ParticlesModule } from 'angular-particle';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AgmCoreModule } from '@agm/core';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { AdminDashComponent } from './components/admin-dash/admin-dash.component';
import { ViewblogsComponent } from './components/viewblogs/viewblogs.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {EditorModule} from 'primeng/editor';
import {SidebarModule} from 'primeng/sidebar';
import {FieldsetModule} from 'primeng/fieldset';
import { ChartModule,HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as drilldown from 'highcharts/modules/drilldown.src';
import {FileUploadModule} from 'primeng/fileupload';
import {GrowlModule} from 'primeng/growl';
import {SafePipe} from './pipes/safe.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from 'ngx-progressbar';
import { SingleblogComponent } from './components/singleblog/singleblog.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { MasterGuard } from './guards/master.guard';
import {NgxPaginationModule} from 'ngx-pagination';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CatfilterPipe } from './pipes/catfilter.pipe';
const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'viewAll', component: ViewblogsComponent},
  {path:'admin', component: AdminDashComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'master', component: LandingComponent,canActivate:[AuthGuard,MasterGuard]},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: ':title', component: SingleblogComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    LandingComponent,
    AdminDashComponent,
    ViewblogsComponent,
    SafePipe,
    SingleblogComponent,
    CatfilterPipe
  ],
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    ParticlesModule,
     AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAzcEI27D-EtLxxrtVaIB8qikgDG7w5cjY'
    }),
    CardModule,
    InputTextModule,
    ButtonModule,
    EditorModule,
    SidebarModule,
    ChartModule,
    FieldsetModule,
    FileUploadModule,
    GrowlModule,
    HttpClientModule,
    NgProgressModule,
    NgxPaginationModule,
    PdfViewerModule
  ],
  providers: [ValidateService, AuthService, AuthGuard,,AdminGuard,UserGuard,MasterGuard,{ provide: HIGHCHARTS_MODULES, useFactory: () => [drilldown ] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
