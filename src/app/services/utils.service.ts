import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private translate:TranslateService){

  }
  
  trans(msg:string, params?:any, prefix?:string):Promise<string>{
    if(prefix) msg = `${prefix}.${msg}`;
    return this.translate.get(msg, params).pipe(first()).toPromise();
  }

  wait(time:number = 100):Promise<null>{
    return new Promise(resolve => {
      setTimeout(function(){
        console.log("waited ", time);
        
        resolve(null);
      }, time);
    });
  }
}
