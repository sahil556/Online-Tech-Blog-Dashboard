import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ToastrModule} from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { FormsModule } from '@angular/forms';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoryComponent,
    AllPostComponent,
    NewPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
