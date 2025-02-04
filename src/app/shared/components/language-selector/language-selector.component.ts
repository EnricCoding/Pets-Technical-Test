import { Component } from '@angular/core';
import { Language } from '../../../enum/language/language.enum';
import { CustomTranslateService } from '../../../core/i18n/translate.service';

@Component({
  selector: 'app-language-selector',
  standalone: false,
  
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {

  languages = Object.values(Language); 
  selectedLanguage: Language = Language.EN; 

  constructor(private translateService: CustomTranslateService) {}

  changeLanguage(): void {
    this.translateService.changeLanguage(this.selectedLanguage);
  }

}
