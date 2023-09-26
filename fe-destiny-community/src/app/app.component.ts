import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FE_Destiny';
  constructor(private translateService: TranslateService) {}

  public selectLg(event: any) {
    this.translateService.use(event.target.value);
  }
}
