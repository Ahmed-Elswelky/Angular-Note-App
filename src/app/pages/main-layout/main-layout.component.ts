import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  constructor(private translate: TranslateService){
    translate.setDefaultLang('en');
    this.updateDirection(this.translate.getDefaultLang());
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.updateDirection(lang);
  }

  private updateDirection(lang: string) {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
