import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { HttpClientModule } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DatenschutzComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
