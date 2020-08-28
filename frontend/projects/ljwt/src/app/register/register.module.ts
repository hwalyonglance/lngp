import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // <- HERE
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { GuestGuardService } from '../services/guest-guard.service';

import { RegisterComponent } from './register.component';

const routes: Routes = [
	{
		path: '',
		component: RegisterComponent,
		canActivate: [GuestGuardService]
	}
];

@NgModule({
	declarations: [RegisterComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule.forChild(routes)
	]
})
export class RegisterModule { }
