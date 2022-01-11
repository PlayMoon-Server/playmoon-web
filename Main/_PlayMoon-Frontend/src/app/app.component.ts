import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, NgModule } from '@angular/core';
import { SendHttpReqService } from './services/send-http/send-http-req.service';
import { CheckUserService } from './services/check-user/check-user.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthUserService } from './services/auth-user/auth-user.service';
import { loginData, registerData, user } from './types/auth.type';
import { GetUserService } from './services/get-user/get-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'PlayMoon';

  avatar: String = "https://mc-heads.net/avatar/noob"

  first: Number = 0
  second: Number = 0
  third: Number = 0

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
      height: '3vh'
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
     private cookieService: CookieService, private authUser: AuthUserService, private getUser: GetUserService, private router: Router) {
     
  }
  
  async ngOnInit() {
    await this.checkIfLoggedIn()
    this.embedAnimations()
    this.countDownTimeout(0, 100)
    window.addEventListener('resize', this.resize.bind(this))
  }

  resetError() {
    this.currentErr = {
      err: false,
      error: ''
    }
  }

  setError(error: string) {
    this.currentErr = {
      err: true,
      error: error
    }
  }

  resetData() {
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

  async checkIfLoggedIn() {
    const checkUser = await this.checkUser.checkUserByToken() 
    this.loggedIn = checkUser.isLoggedIn
    if(!this.loggedIn) return
    this.user = checkUser.data.user
    this.avatar = this.getUser.avatar(this.user.name)
  }

  async logout() {
    this.loggedIn = false
    this.avatar = this.getUser.avatar('noob')
    this.cookieService.delete('accessToken')
  }

  goToPrivacyPolice() {
    this.router.navigateByUrl('/datenschutz')
  }


  async loginBtn() {
   let authLogin = await this.authUser.loginByPassword(this.login)
   if(authLogin.err) return this.setError(authLogin.error)
   this.checkIfLoggedIn()
   this.hideForm('login')
   this.hideForm('register')
   this.resetError() 
  }

  async registerBtn() {
    let authRegister = await this.authUser.registerByVerifyToken(this.register)
    if(authRegister.err) return this.setError(authRegister.error)
    this.checkIfLoggedIn()
    this.hideForm('login')
    this.hideForm('register')
    this.resetError() 
  }

  reloadPage() {
    window.location.reload()
  }

  embedAnimations() {
    setTimeout(()=>{
      this.styles.navBtns.width = '200px'
      this.styles.navBtns.height = '4.8vh'
    }, 100)
  }

  countDownTimeout(i: number, number: number) {

    if (i > number) {
        this.first = 1
        this.second = 0
        this.third = 0
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

    setTimeout(() => {
        this.countDownTimeout(i, number)
    }, 3000 / number)
  }

  copyToClipboard(textToCopy: any) {
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
          return
      }
  }

  serverIpClick(){
    this.copyToClipboard('PlayMoon.de')
    this.serverIpTxt = 'COPIED'
    this.styles.serverIp.background = 'green'
    this.styles.serverIp.fontSize = '20px'
    setTimeout(() => {
        this.serverIpTxt = 'PlayMoon.de'
        this.styles.serverIp.background = '#fff'
    }, 500)
  }

  windowScroll(ev: any) {
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
  
  openNav() {
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

  closeNav() {
      this.styles.mobile.mobileNav.visibility = 'hidden'
      this.styles.mobile.mobileNav.opacity = '0'

      this.classes.mobileNav.blur = false
        
      this.styles.mobile.mobileInnerNav.visibility = 'hidden'

      this.styles.mobile.bars.display = (window.innerWidth > 1080) ? 'none' : 'block' 
  }

  resize() {
    if (window.innerWidth > 1080) {
      this.styles.mobile.bars.display = 'none'
      return
    }
    this.styles.mobile.bars.display = 'block'
  }

  hideForm(type: String) {
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

  showForm(type: String) {
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
