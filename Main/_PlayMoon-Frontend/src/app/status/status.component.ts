import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ServerStatusService } from '../services/get-server-status/server-status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  status: any = {
    mc: {
    online: false,
    onlinePlayers: false,
    divContent: '...'
   },
   dc: '...',
   backend: {
     web: '...',
     database: '...'
   }
  }

  colors: any = {
    warningColor: '#AC8217',
    alertColor: '#95151C',
    sucessColor: '#559515'
  }

  statusStyle: any = {
    mc: {
      background: 'black'
    },
    dc: {
      background: '#000'
    },
    backend: {
      web: {
        background: '#000'
      },
      database: {
        background: '#000'
      }
    }
  }

  constructor(private statusService: ServerStatusService, private titleService: Title) { }

  async ngOnInit(): Promise<void> {
    this.titleService.setTitle('PlayMoon - Status')
    await this.set().setAll()
  }
  set(): any {
    const setServerStatus = async (): Promise<void> => {
      this.status.mc.online = await this.statusService.getOnlineStatus('playmoon.de')
      if(this.status.mc.online) {
        this.check().checkMaintenance()
        this.statusStyle.dc.background = this.colors.sucessColor
        this.status.dc = 'online'
      } else {
        this.status.mc.divContent = 'offline',
        this.statusStyle.mc.background = this.colors.alertColor

        this.statusStyle.dc.background = this.colors.alertColor
        this.status.dc = 'offline'
      }
    }

    const setOnlinePlayers = async (): Promise<void> => {
      this.status.mc.onlinePlayers = await this.statusService.getOnlinePlayers('playmoon.de')
      return
    }

    const setDatabaseStatus = async (): Promise<void> => {
      let dbReq = await this.statusService.backend().getDbStatus()
      this.status.backend.database = dbReq.content

      if(dbReq.status == 0) return this.statusStyle.backend.database.background = this.colors.alertColor
      if(dbReq.status == 1) return this.statusStyle.backend.database.background = this.colors.sucessColor
      if(dbReq.status == 2 || dbReq.status == 3) return this.statusStyle.backend.database.background = this.colors.warningColor
    }

    const setBackendStatus = async (): Promise<any> => {
      const res = await this.statusService.backend().checkBackendStatus()
      if(res) {
        this.statusStyle.backend.web.background = this.colors.sucessColor
        return this.status.backend.web = 'online'
      } else {
        this.statusStyle.backend.web.background = this.colors.alertColor
        return this.status.backend.web = 'offline'
      }
    }


    let setAll = async (): Promise<void> => {
      await setServerStatus()
      await setOnlinePlayers()
      await setDatabaseStatus()  
      await setBackendStatus()
    }

    return {
      setServerStatus: setServerStatus,
      setOnlinePlayers: setOnlinePlayers,
      setDatabaseStatus: setDatabaseStatus,
      setBackendStatus: setBackendStatus,
      setAll: setAll,
    }
  }
  check(): any {
    const checkMaintenance = async () => {
      const motd = await this.statusService.getMotd('playmoon.de')
      if(motd.includes('§f§r')) {
        this.status.mc.divContent = 'wartung'
        this.statusStyle.mc.background = this.colors.warningColor
      } else {
        this.status.mc.divContent = 'online',
        this.statusStyle.mc.background = this.colors.sucessColor
      }
    }

    return {
      checkMaintenance: checkMaintenance
    }
  }
}
