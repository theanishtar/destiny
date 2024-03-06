import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal
import { ProfileService } from '@app/user/service/profile.service';
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl,
} from '@angular/forms';
import '../../../../assets/toast/main.js';
declare var toast: any;
@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: [
		`../../../css/vendor/bootstrap.min.css`,
		`../../../css/styles.min.css`,
		'./change-password.component.css']
})
export class ChangePasswordComponent {
	public changePasswordForm!: FormGroup;
	submitted: boolean = false;
	constructor(
		public profileService: ProfileService,
		private formbuilder: FormBuilder,
	) { }

	ngOnInit() {
		this.createFormChangePassword();
	}


	createFormChangePassword() {
		const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{4,20}$/;
		this.changePasswordForm = this.formbuilder.group({
			oldPassword: ['', Validators.required],
			newPassword: ['',
				[
					Validators.required,
					Validators.pattern(PASSWORD_PATTERN),
				]],
			renewPassword: ['', Validators.required]
		});
	}
	get profileFormControl() {
		return this.changePasswordForm.controls;
	}
	updatePass() {
		this.submitted = true;
		if (this.changePasswordForm.get("newPassword")!.value == this.changePasswordForm.get("renewPassword")!.value && this.changePasswordForm.valid) {
			this.profileService.updatePassword(this.changePasswordForm.value).subscribe((res) => {
				
			})
		} else {
			new toast({
				title: 'Thất bại!',
				message: 'Vui lòng kiểm tra lại xác nhận mật khẩu!',
				type: 'error',
				duration: 2000,
			});
		}
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
