import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { HttpClientModule } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { ForumComponent } from './forum/forum.component';
import { ForumCatagoriesComponent } from './forum/forum-catagories/forum-catagories.component';
import { StatusComponent } from './status/status.component';
import { DiscordComponent } from './discord/discord.component';
import { ShopComponent } from './shop/shop.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DatenschutzComponent,
    ForumComponent,
    ForumCatagoriesComponent,
    StatusComponent,
    DiscordComponent,
    ShopComponent    
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
