import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

import { HomeComponent } from './home.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [AuthGuardService]
	}
];

@NgModule({
	declarations: [HomeComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
	]
})
export class HomeModule { }
