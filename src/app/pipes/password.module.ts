import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordPipe } from './password.pipe';



@NgModule({
  declarations: [PasswordPipe],
  imports: [
    CommonModule
  ],
  exports: [PasswordPipe]
})
export class PasswordModule { }
