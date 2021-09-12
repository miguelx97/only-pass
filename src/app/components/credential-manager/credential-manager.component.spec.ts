import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

import { CredentialManagerComponent } from './credential-manager.component';

describe('CredentialManagerComponent', () => {
  let component: CredentialManagerComponent;
  let fixture: ComponentFixture<CredentialManagerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialManagerComponent ],
      imports: [
        IonicModule.forRoot()
        , TranslateModule.forRoot()
        , AngularFireModule.initializeApp(environment.firebaseConfig)
        , FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CredentialManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
