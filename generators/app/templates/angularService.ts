import { Injectable } from '@angular/core';
import { ServiceUtil } from '../util/service.util';
import { <%-nomeTitleCase%> } from '<%- nomeDashCase%>';
import { HttpService } from 'ems-oauth2-client';

@Injectable({
  providedIn: 'root'
})
export class <%-nomeTitleCase%>Service extends ServiceUtil {

  url = '/<%-areaLower%>/<%-subLower%>/<%-nomeLowerCase%>/'
  //urlSemSubArea = '/<%-areaLower%>/<%-nomeLowerCase%>/'


  constructor(
    private httpService: HttpService
  ) { super(); }

  public find(filter: <%-nomeTitleCase%>){
    return this.httpService.get(this.url +'?filter='+ JSON.stringify(filter));
  }

  public findById(id: number){
    return this.httpService.get(this.url + id);
  }

  public insert(filter: <%-nomeTitleCase%>){
    return this.httpService.post(this.url, JSON.stringify(filter))
  }

  public update(filter: <%-nomeTitleCase%>){
    return this.httpService.put(this.url, JSON.stringify(filter));
  }
  
  public delete(id: number){
    return this.httpService.delete(this.url + id);
  }
  
}
