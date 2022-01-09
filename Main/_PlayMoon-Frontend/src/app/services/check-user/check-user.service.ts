import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SendHttpReqService } from '../send-http/send-http-req.service';

@Injectable({
  providedIn: 'root'
})
export class CheckUserService {
  acToken: any = {
    token: '',
    exists: false    
  }

  data: any

  constructor(private sendHttpReq: SendHttpReqService, private cookieService: CookieService) {
    
  }

  async checkUserByToken() {
    if(!this.doesTokenExist()) return { isLoggedIn: false }

    const checkToken = (await this.checkToken())
    if(!checkToken.isValid) return { isLoggedIn: false }
    
    return { isLoggedIn: true, data: checkToken.data, userToken: this.acToken.token }
  }

  private doesTokenExist() {
    this.acToken.token = this.cookieService.get('accessToken')
    if(this.acToken.token) this.acToken.exists = true
    return this.acToken.exists
  }

  private async checkToken() {
    this.acToken.token = this.cookieService.get('accessToken')
    const route = `/get/user/byCookieToken/${this.acToken.token}`
    const req = await this.sendHttpReq.sendGetReq(route)
    this.data = req.reqData
    if(req.err) return { isValid: false }
    if(this.data.err || req.err) return { isValid: false }
    return { isValid: true, data: this.data }
  }

}
