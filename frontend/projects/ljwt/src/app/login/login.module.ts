import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { GuestGuardService } from '../services/guest-guard.service';

import { LoginComponent } from './login.component';

const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
		canActivate: [GuestGuardService]
	}
];

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes)
	]
})
export class LoginModule { }
