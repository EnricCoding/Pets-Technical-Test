import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';

import { CustomTranslateService } from './translate.service';
import { Language } from '../../enum/language/language.enum';

describe('CustomTranslateService', () => {
  let service: CustomTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(), 
      ],
      providers: [
        TranslateService, 
        TranslateStore,   
      ],
    });
    service = TestBed.inject(CustomTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the default language to EN on creation', () => {
    const translateService = TestBed.inject(TranslateService);
    const defaultLangSpy = spyOn(translateService, 'setDefaultLang').and.callThrough();
    const useLangSpy = spyOn(translateService, 'use').and.callThrough();
  
    service = new CustomTranslateService(translateService);
  
    expect(defaultLangSpy).toHaveBeenCalledWith(Language.EN);
    expect(useLangSpy).toHaveBeenCalledWith(Language.EN);
  });

  it('should change the language using changeLanguage method', () => {
    const translateService = TestBed.inject(TranslateService);
    const useLangSpy = spyOn(translateService, 'use').and.callThrough();

    service.changeLanguage(Language.ES);

    expect(useLangSpy).toHaveBeenCalledWith(Language.ES);
  });

});
