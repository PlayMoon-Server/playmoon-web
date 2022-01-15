import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import data from '../get-data/get-data'

@Injectable({
  providedIn: 'root'
})
export class ServerStatusService {
  ping: any = false

  constructor(private http: HttpClient) { }

  async getPing(server_adress: string): Promise<any> {
    return (await this.http.get(`https://mcstatus.snowdev.com.br/api/query/v3/${server_adress}`).toPromise()).valueOf()
  }
  
  async setPing(server_adress: string): Promise<void> {
    await this.getPing(server_adress)
    this.ping = await this.getPing(server_adress)
  }

  async getOnlineStatus(server_adress: string): Promise<Object> {
    await this.setPing(server_adress)
    return this.ping.online
  }

  async getOnlinePlayers(server_adress: string) {
    await this.setPing(server_adress)
    return this.ping.players_online
  }
  async getMotd(server_adress: string) {
    await this.setPing(server_adress)
    return this.ping.motd    
  }

  backend(): any {
    const getDbStatus = async (): Promise<object> =>  {
      try {
        const val = (await this.http.get(`${data.apiLink}/get/database/status`).toPromise()).valueOf()
        return val
      } catch(err) {
        return {status: 3, content: '???'}
      }
    }
    
    const checkBackendStatus = async (): Promise<Boolean> => {
     try {
      await this.http.get(`${data.apiLink}/`).toPromise()
      return true
    }catch(err) {
      return false
     }
    }
    
    return {
      getDbStatus: getDbStatus,
      checkBackendStatus: checkBackendStatus
    }
  }


}
