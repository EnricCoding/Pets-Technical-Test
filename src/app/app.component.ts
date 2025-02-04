import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './enum/language/language.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-Pets';
  
  constructor(private translate: TranslateService) {

    const supportedLangs = Object.values(Language);
    const defaultLang = Language.EN;
    const browserLang = this.translate.getBrowserLang() || defaultLang;
    
    this.translate.addLangs(supportedLangs);
    this.translate.setDefaultLang(defaultLang);
    
    this.translate.use(
      supportedLangs.includes(browserLang as Language) ? browserLang : defaultLang
    );
  }
  

}
