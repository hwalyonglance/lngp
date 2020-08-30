import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	// Variables
	form: FormGroup;
	loading = false;
	errors = false;
	// registerUrl = 'http://ljwt.test/register'; // 419 CSRF token mismatch.
	// registerUrl = 'http://ljwt.test/api/register'; // 422 The given data was invalid
	// registerUrl = 'http://ljwt.test/api/buat-akun';
	registerUrl = 'http://ljwt.test/api/create2';

	ConfirmValidator = (controlName: string, matchingControlName: string) => {

		return (formGroup: FormGroup) => {

			const control = formGroup.controls[controlName];

			const matchingControl = formGroup.controls[matchingControlName];

			if (control.value !== matchingControl.value) {
				matchingControl.setErrors({ passwordMatch: false });
				return { passwordMatch: false };
			} else {
				return matchingControl.setErrors(null);
			}

		}
	}
	constructor (
		fb: FormBuilder,
		private router: Router,
		private authService: AuthService,
		private http: HttpClient,
	) {
		this.form = fb.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
			passwordConfirm: ['', Validators.required],
		}, {
			validator: this.ConfirmValidator('password', 'passwordConfirm')
		})
	}
	ngOnInit(): void { }
	register(e: any) {
		this.http.post(this.registerUrl, {
			...this.form.value,
			// client_id: '1',
			// client_secret: 'hlkQihxLFG5EBG7BgZTqFEluahvs7fg28J3CTuHw',
			client_id: '2',
			client_secret: '9G3M76Fne2iV0nyPmP4Yi5zdC7nqo9WfKOQxRoxM',
			grant_type: '',
			scope: '',
		}, {
			headers: new HttpHeaders({
				Accept: 'application/json',
				'Content-Type': 'application/json'
			})
		}).subscribe(response => {
			console.log(response);
			this.router.navigateByUrl('login')
		}, error => {
			console.log(error)
		})
	}
}
