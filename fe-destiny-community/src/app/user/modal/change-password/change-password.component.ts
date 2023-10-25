import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal
import { ProfileService } from '@app/user/service/profile.service';
import { form } from '../../../../assets/js/form/form.utils.js';
import { tabs } from '../../../../assets/js/landing/landing.tabs.js';
@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: [
		`../../../css/vendor/bootstrap.min.css`,
		`../../../css/styles.min.css`,
		'./change-password.component.css']
})
export class ChangePasswordComponent {

	constructor(
		public profileService: ProfileService
	) { }

	ngOnInit() {
		// tabs.tabs();
		// form.formInput();
	}

	showHidePassword(inputId, iconId) {
		const input = document.getElementById(inputId) as HTMLInputElement;
		const icon = document.getElementById(iconId) as HTMLInputElement;
	  
		if (input.type === "password") {
		  input.type = "text";
		  icon.className = 'fa-regular fa-eye';
		} else {
		  input.type = "password";
		  icon.className = 'fa-regular fa-eye-slash';
		}
	  }
}
