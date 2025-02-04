import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../enum/language/language.enum';

@Injectable({
  providedIn: 'root',
})
export class CustomTranslateService {

  constructor(private translate: TranslateService) {
    const defaultLang = Language.EN;
    const browserLang = translate.getBrowserLang() as Language;
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(browserLang in Language ? browserLang : defaultLang);
  }

  changeLanguage(lang: Language): void {
    this.translate.use(lang);
  }
  
}
