import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  page:String;
  async ngOnInit() {
    this.page = await this.http.get('https://miguelx97.github.io/common-info-about-me/sobre-mi', {responseType: "text"}).pipe(first()).toPromise();
  }
}
