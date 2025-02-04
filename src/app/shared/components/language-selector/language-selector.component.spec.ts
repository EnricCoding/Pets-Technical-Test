import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { LanguageSelectorComponent } from './language-selector.component';
import { CustomTranslateService } from '../../../core/i18n/translate.service';
import { Language } from '../../../enum/language/language.enum';

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageSelectorComponent],
      imports: [
        TranslateModule.forRoot(),
        FormsModule,
      ],
      providers: [TranslateService, TranslateStore, CustomTranslateService],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call translateService.changeLanguage when changing the language', () => {
    const translateServiceSpy = spyOn(component['translateService'], 'changeLanguage');
    
    component.selectedLanguage = Language.ES;
    component.changeLanguage();

    expect(translateServiceSpy).toHaveBeenCalledWith(Language.ES);
  });

  it('should update selectedLanguage when selecting a new option', () => {
    const selectElement: HTMLSelectElement = fixture.nativeElement.querySelector('select');
    
    selectElement.value = Language.ES;
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.selectedLanguage).toBe(Language.ES);
  });
});
