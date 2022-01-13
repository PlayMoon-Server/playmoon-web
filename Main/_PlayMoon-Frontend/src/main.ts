import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
}

let title: string = 'PlayMoon - Home'

document.head.title = title

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err))
