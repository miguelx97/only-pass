import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { BtnShowCredentialManagerComponent } from './btn-show-credential-manager.component';

describe('BtnShowCredentialManagerComponent', () => {
  let component: BtnShowCredentialManagerComponent;
  let fixture: ComponentFixture<BtnShowCredentialManagerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnShowCredentialManagerComponent ],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BtnShowCredentialManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
