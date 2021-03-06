import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credential } from 'src/app/model/credential';

@Component({
  selector: 'app-credential-detail',
  templateUrl: './credential-detail.page.html',
  styleUrls: ['./credential-detail.page.scss'],
})
export class CredentialDetailPage implements OnInit {

  constructor(private router: Router) { }

  credencial:Credential

  ngOnInit() {
    const navExtras = this.router.getCurrentNavigation().extras.state;
    
    if (navExtras) {
      this.credencial = navExtras.credential;
      
    } else {
      // this.router.navigateByUrl("");
      this.credencial = new Credential();
      this.credencial.build("1234", "Spotify", "miguelmartin97@hotmail.com", "contraseña1234", "www.spotify.com");
    }
  }

}
