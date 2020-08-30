import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authUrl = 'http://ljwt.test/oauth/token';
	apiUrl = 'http://ljwt.test/api';
	// authUrl = 'http://localhost:8000/oauth/token';
	// apiUrl = 'http://localhost:8000/api';
	options = {
		headers: new HttpHeaders({
			Accept: 'application/json',
			'Content-Type': 'application/json'
		})
	};
	constructor (
		private http: HttpClient
	) {
	}

	/**
   * Get an access token
   * @param e The email address
   * @param p The password string
   */
	login(email: string, password: string) {
		return this.http.post(this.authUrl, {
			grant_type: 'password',
			client_id: '2',
			client_secret: '9G3M76Fne2iV0nyPmP4Yi5zdC7nqo9WfKOQxRoxM',
			scope: '',
			email, // |email
			username: email, // |email
			password,
		}, this.options);
	}
	/**
	 * Revoke the authenticated user token
	 */
	logout() {
		return this.http.get(this.apiUrl + '/token/revoke', {
			headers: new HttpHeaders({
				Authorization: 'Bearer ' + localStorage.getItem('access_token'),
				Accept: 'application/json',
				'Content-Type': 'application/json'
			})
		});
	}
}
