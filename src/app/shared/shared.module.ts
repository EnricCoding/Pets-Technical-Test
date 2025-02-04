import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableTableComponent } from './components/reusable-table/reusable-table.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ReusableTableComponent,
    LanguageSelectorComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    MatIconModule
  ],
  exports: [
    ReusableTableComponent,
    LanguageSelectorComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
