import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CheckUserService } from '../check-user/check-user.service';
import { SendHttpReqService } from '../send-http/send-http-req.service';
import { loginData, registerData } from 'src/app/types/auth.type';
@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  loginData: any
  registerData: any
  

  constructor(private sendHttpReq: SendHttpReqService, private cookieService: CookieService, private checkUser: CheckUserService) { 

  }

  async loginByPassword(loginBody: loginData) {
    const route = `/auth/login`
    let reqData

    this.loginData = await this.sendHttpReq.sendPostReq(route, loginBody)
    reqData = this.loginData.reqData

    if(this.loginData.err) return { err: true, error: reqData.error }

    if(this.loginData.reqData.err) return { err: true, error: reqData.error }
    this.updateCookieAcToken(reqData.userToken)
    const userData = (await this.checkUser.checkUserByToken())
    console.log(userData)
    return { err: false, error: null, data: userData }

  }

  async registerByVerifyToken(data: registerData) {
    const route = `/auth/register`
    let reqData
    this.registerData = await this.sendHttpReq.sendPostReq(route, data)
    reqData = this.registerData.reqData

    if(this.registerData.err) return { err: true, error: reqData.error }
    if(reqData.err) return {err: true, error: reqData.error}
    await this.updateCookieAcToken(reqData.userToken)
    const userData = (await this.checkUser.checkUserByToken()).data.user
    
    return { err: false, error: null, data: userData }
  }

  private async updateCookieAcToken(token: String) {
    let date = new Date();
    date.setDate(date.getDate() + 30);
    this.cookieService.set('accessToken', `${token}`, date )
  }


  

}
