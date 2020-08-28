import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
		console.log(e, this.form.getRawValue())
		this.http.post('http://ljwt.test/api/buat-akun', this.form.value, {
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
