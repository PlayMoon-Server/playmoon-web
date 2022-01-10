import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DatenschutzComponent } from './datenschutz/datenschutz.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'datenschutz', component: DatenschutzComponent},
  {path: '**', redirectTo: '/home'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
