import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LanguageSelectorComponent } from './shared/components/language-selector/language-selector.component'; 

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      declarations: [
        AppComponent,
        NavbarComponent,        
        LanguageSelectorComponent, 
      ],
      providers: [
        TranslateService, 
        TranslateStore,   
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pets-project'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('test-Pets');
  });

});
