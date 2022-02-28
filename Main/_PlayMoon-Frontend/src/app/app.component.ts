import { Component, ElementRef, NgModule } from '@angular/core';
import { SendHttpReqService } from './services/send-http/send-http-req.service';
import { CheckUserService } from './services/check-user/check-user.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthUserService } from './services/auth-user/auth-user.service';
import { loginData, registerData, user } from './types/auth.type';
import { GetUserService } from './services/get-user/get-user.service';
import { ServerStatusService } from './services/get-server-status/server-status.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'PlayMoon';

  avatar: String = "https://mc-heads.net/avatar/noob"

  first: any = 0
  second: any = 0
  third: any = 0

  serverIpTxt = 'PlayMoon.de'

  loggedIn: Boolean = true

  user: any = {
    rank: 'spieler',
    name: 'noob'
  }

  login: loginData = {
    name: "",
    pw: ""
  }

  register: registerData = {
    verifyToken: "",
    pw: "",
    pw2: "",
    email: ""
  }

  currentErr = {
    err: false,
    error: ''
  }

  styles: any = {
    navBtns: {
      width: '150px',
      height: '50px'
    },
    serverIp: {
      background: '#fff',
      fontSize: '20px'
    },
    mobile: {
      mobileInnerNav: {
        visibility: 'hidden'
      },
      mobileNav: {
        visibility: 'hidden',
        opacity: '0',
        display: 'block'
      },
      bars: {
        display: (window.innerWidth > 1080) ? 'none' : 'block'
      }
    }
  }

  classes: any = {
    header: {
      blur: false,
      scrollHeader: false
    },
    nav: {
      blur: false,
      scrollNav: false
    },
    mobileNav: {
      blur: false
    },
    forms: {
      formLogin: {
        removeFilter: true
      },
      formRegister: {
        removeFilter: true
      },
      innerFormLogin: {
        hidden: true
      },
      innerFormRegister: {
        hidden: true
      }
    }

    
  }


  constructor (private elem: ElementRef, private sendHttpReq: SendHttpReqService, private checkUser: CheckUserService,
     private cookieService: CookieService, private authUser: AuthUserService, private getUser: GetUserService,
     public router: Router, private status: ServerStatusService) {
  }
  
  async ngOnInit(): Promise<void> {
    await this.checkIfLoggedIn()
    this.embedAnimations()
    this.countDownTimeout(0, await this.status.getOnlinePlayers('playmoon.de') || 0, false)
    window.addEventListener('resize', this.resize.bind(this))
  }

  resetError(): void {
    this.currentErr = {
      err: false,
      error: ''
    }
  }

  setError(error: string): void {
    this.currentErr = {
      err: true,
      error: error
    }
  }

  resetData(): void {
    this.login = {
      name: "",
      pw: ""
    }
  
    this.register = {
      verifyToken: "",
      pw: "",
      pw2: "",
      email: ""
    }
  
    this.resetError()
  }

  async checkIfLoggedIn(): Promise<void> {
    const checkUser = await this.checkUser.checkUserByToken() 
    this.loggedIn = checkUser.isLoggedIn
    if(!this.loggedIn) return
    this.user = checkUser.data.user
    this.avatar = this.getUser.avatar(this.user.name)
  }

  async logout(): Promise<void> {
    this.loggedIn = false
    this.avatar = this.getUser.avatar('noob')
    this.cookieService.delete('accessToken')
  }

  goTo(route: String): void {
    this.router.navigateByUrl(`/${route}`)
    this.closeNav()
    this.scrollToTop()
  }

  goToPrivacyPolice(): void {
    this.router.navigateByUrl('/datenschutz')
  }


  async loginBtn(): Promise<void> {
   let authLogin = await this.authUser.loginByPassword(this.login)
   if(authLogin.err) return this.setError(authLogin.error)
   this.checkIfLoggedIn()
   this.hideForm('login')
   this.hideForm('register')
   this.resetError() 
  }

  async registerBtn(): Promise<void> {
    let authRegister = await this.authUser.registerByVerifyToken(this.register)
    if(authRegister.err) return this.setError(authRegister.error)
    this.checkIfLoggedIn()
    this.hideForm('login')
    this.hideForm('register')
    this.resetError() 
  }

  reloadPage(): void {
    window.location.reload()
  }

  embedAnimations(): void {
    setTimeout(()=>{
      this.styles.navBtns.width = '200px'
      this.styles.navBtns.height = '35px'
    }, 100)
  }

  countDownTimeout(i: number, number: number, didRun: boolean): void {
    if (i > number) {
      if (number < 10) {
        this.first = 0
        this.second = 0
        this.third = parseInt(number.toString()[0])
      }
      if (number < 100 && number > 9) {
          this.first = 0
          this.second = parseInt(number.toString()[0])
          this.third = parseInt(number.toString()[1])

      }
      if (number > 99) {
          this.first = parseInt(number.toString()[0])
          this.second = parseInt(number.toString()[1])
          this.third = parseInt(number.toString()[2])
      }
      i = 0
      return
    }

    var iString = i.toString()
    var first = iString[0]
    var scnd = iString[1]
    var thrd = iString[2]

    if (i < 10) {
        this.first = 0
        this.second = 0
        this.third = parseInt(first)
    }
    if (i < 100 && i > 9) {
        this.first = 0
        this.second = parseInt(first)
        this.third = parseInt(scnd)

    }
    if (i > 99) {
        this.first = parseInt(first)
        this.second = parseInt(scnd)
        this.third = parseInt(thrd)
    }

    i++

    if(!didRun) return this.countDownTimeout(i, number, true)

    setTimeout(() => {
        this.countDownTimeout(i, number, true)
    }, 2000 / number)
  }


  copyToClipboard(textToCopy: any): Promise<void> {
      if (navigator.clipboard && window.isSecureContext) {
          return navigator.clipboard.writeText(textToCopy);
      } else {
          let textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          return new Promise(() => {})
      }
  }

  serverIpClick(): void {
    this.copyToClipboard('PlayMoon.de')
    this.serverIpTxt = 'COPIED'
    this.styles.serverIp.background = 'green'
    this.styles.serverIp.fontSize = '20px'
    setTimeout(() => {
        this.serverIpTxt = 'PlayMoon.de'
        this.styles.serverIp.background = '#fff'
    }, 500)
  }

  windowScroll(ev: any): void {
    if (ev.target.scrollTop > 15) {
        this.classes.header.blur = true
        this.classes.header.scrollHeader = true
        this.classes.nav.blur = true
        this.classes.nav.scrollNav = true
        return
    }
    this.classes.header.blur = false
    this.classes.header.scrollHeader = false
    this.classes.nav.blur = false
    this.classes.nav.scrollNav = false
  }

  scrollToTop(): void {
    (document.querySelector('.scrolling') as HTMLElement).scroll(0, 0)
  }

  openNav(): void {
    if(window.innerWidth > 1080) return

    this.styles.mobile.mobileInnerNav.visibility = 'visible'

    this.styles.mobile.mobileNav.opacity = '1'
    this.styles.mobile.mobileNav.visibility = 'visible'
    this.styles.mobile.mobileNav.display = 'block'
   
    this.classes.mobileNav.blur = true
   
    setTimeout(() => {
        this.styles.mobile.bars.display = (window.innerWidth > 1080) ? 'none' : 'block'
    }, 200)
  }

  closeNav(): void {
      this.styles.mobile.mobileNav.visibility = 'hidden'
      this.styles.mobile.mobileNav.opacity = '0'

      this.classes.mobileNav.blur = false
        
      this.styles.mobile.mobileInnerNav.visibility = 'hidden'

      this.styles.mobile.bars.display = (window.innerWidth > 1080) ? 'none' : 'block' 
  }

  resize(): void {
    if (window.innerWidth > 1080) {
      this.styles.mobile.bars.display = 'none'
      return
    }
    this.styles.mobile.bars.display = 'block'
  }

  hideForm(type: String): void {
    switch (type) {
        case "login":
            this.classes.forms.innerFormLogin.hidden = true
            
            setTimeout(() => {
              this.classes.forms.formLogin.removeFilter = true
            }, 320)
            break;
        
        case "register":
            this.classes.forms.innerFormRegister.hidden = true
        
            setTimeout(() => {
              this.classes.forms.formRegister.removeFilter = true
            }, 320)
            break;
    }
  }

  showForm(type: String): void {
    this.resetData()
    switch (type) {
        case "login":
            this.closeNav()
            this.hideForm("register")
            setTimeout(()=>{
              this.classes.forms.formLogin.removeFilter = false
              setTimeout(()=>{
                this.classes.forms.innerFormLogin.hidden = false
              }, 50)
            }, 200)
            break;
        case "register":
            this.closeNav()
            this.hideForm("login")
            setTimeout(()=>{
              this.classes.forms.formRegister.removeFilter = false
              setTimeout(()=>{
                this.classes.forms.innerFormRegister.hidden = false
              }, 50)
            }, 200)
            break;
    }
  }
}
