import { Pipe, PipeTransform } from '@angular/core';
import { CryptingService } from '../services/crypting.service';

@Pipe({
  name: 'password'
})
export class PasswordPipe implements PipeTransform {

  constructor(private cryptingSvc:CryptingService){}
  transform(value: string, show:boolean = false): string {
    if(!show) return "••••••••••"

    return this.cryptingSvc.decryptData(value);
  }

}
