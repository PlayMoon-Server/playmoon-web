import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DatenschutzComponent } from './datenschutz/datenschutz.component'
import { ForumCatagoriesComponent } from './forum/forum-catagories/forum-catagories.component'
import { ForumComponent } from './forum/forum.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'datenschutz', component: DatenschutzComponent},
  {path: 'forum', component: ForumComponent, children: [
    {path: 'catagories', component: ForumCatagoriesComponent}
  ]},
  {path: '**', component: HomeComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
