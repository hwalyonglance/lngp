+--------+----------+-----------------------------------------+-----------------------------------+---------------------------------------------------------------------------+------------+
| Domain | Method   | URI                                     | Name                              | Action                                                                    | Middleware |
+--------+----------+-----------------------------------------+-----------------------------------+---------------------------------------------------------------------------+------------+
|        | GET|HEAD | /                                       |                                   | Closure                                                                   | web        |
|        | POST     | api/buat-akun                           | buat-akun                         | App\Http\Controllers\Auth\RegisterController@store                        | api        |
|        |          |                                         |                                   |                                                                           | guest      |
|        | GET|HEAD | api/login                               | login                             | App\Http\Controllers\Auth\LoginController@showLoginForm                   | api        |
|        |          |                                         |                                   |                                                                           | guest      |
|        | POST     | api/login                               |                                   | App\Http\Controllers\Auth\LoginController@login                           | api        |
|        |          |                                         |                                   |                                                                           | guest      |
|        | POST     | api/logout                              | logout                            | App\Http\Controllers\Auth\LoginController@logout                          | api        |
|        | POST     | api/password/confirm                    |                                   | App\Http\Controllers\Auth\ConfirmPasswordController@confirm               | api        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | GET|HEAD | api/password/confirm                    | password.confirm                  | App\Http\Controllers\Auth\ConfirmPasswordController@showConfirmForm       | api        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | POST     | api/password/email                      | password.email                    | App\Http\Controllers\Auth\ForgotPasswordController@sendResetLinkEmail     | api        |
|        | POST     | api/password/reset                      | password.update                   | App\Http\Controllers\Auth\ResetPasswordController@reset                   | api        |
|        | GET|HEAD | api/password/reset                      | password.request                  | App\Http\Controllers\Auth\ForgotPasswordController@showLinkRequestForm    | api        |
|        | GET|HEAD | api/password/reset/{token}              | password.reset                    | App\Http\Controllers\Auth\ResetPasswordController@showResetForm           | api        |
|        | POST     | api/register                            |                                   | App\Http\Controllers\Auth\RegisterController@register                     | api        |
|        |          |                                         |                                   |                                                                           | guest      |
|        | GET|HEAD | api/register                            | register                          | App\Http\Controllers\Auth\RegisterController@showRegistrationForm         | api        |
|        |          |                                         |                                   |                                                                           | guest      |
|        | GET|HEAD | api/token/revoke                        |                                   | Closure                                                                   | api        |
|        |          |                                         |                                   |                                                                           | auth:api   |
|        | GET|HEAD | api/user                                |                                   | Closure                                                                   | api        |
|        |          |                                         |                                   |                                                                           | auth:api   |
|        | GET|HEAD | home                                    | home                              | App\Http\Controllers\HomeController@index                                 | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | GET|HEAD | login                                   | login                             | App\Http\Controllers\Auth\LoginController@showLoginForm                   | web        |
|        |          |                                         |                                   |                                                                           | guest      |
|        | POST     | login                                   |                                   | App\Http\Controllers\Auth\LoginController@login                           | web        |
|        |          |                                         |                                   |                                                                           | guest      |
|        | POST     | logout                                  | logout                            | App\Http\Controllers\Auth\LoginController@logout                          | web        |
|        | GET|HEAD | oauth/authorize                         | passport.authorizations.authorize | Laravel\Passport\Http\Controllers\AuthorizationController@authorize       | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | DELETE   | oauth/authorize                         | passport.authorizations.deny      | Laravel\Passport\Http\Controllers\DenyAuthorizationController@deny        | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | POST     | oauth/authorize                         | passport.authorizations.approve   | Laravel\Passport\Http\Controllers\ApproveAuthorizationController@approve  | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | POST     | oauth/clients                           | passport.clients.store            | Laravel\Passport\Http\Controllers\ClientController@store                  | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | GET|HEAD | oauth/clients                           | passport.clients.index            | Laravel\Passport\Http\Controllers\ClientController@forUser                | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | PUT      | oauth/clients/{client_id}               | passport.clients.update           | Laravel\Passport\Http\Controllers\ClientController@update                 | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | DELETE   | oauth/clients/{client_id}               | passport.clients.destroy          | Laravel\Passport\Http\Controllers\ClientController@destroy                | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | POST     | oauth/personal-access-tokens            | passport.personal.tokens.store    | Laravel\Passport\Http\Controllers\PersonalAccessTokenController@store     | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | GET|HEAD | oauth/personal-access-tokens            | passport.personal.tokens.index    | Laravel\Passport\Http\Controllers\PersonalAccessTokenController@forUser   | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | DELETE   | oauth/personal-access-tokens/{token_id} | passport.personal.tokens.destroy  | Laravel\Passport\Http\Controllers\PersonalAccessTokenController@destroy   | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | GET|HEAD | oauth/scopes                            | passport.scopes.index             | Laravel\Passport\Http\Controllers\ScopeController@all                     | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | POST     | oauth/token                             | passport.token                    | Laravel\Passport\Http\Controllers\AccessTokenController@issueToken        | throttle   |
|        | POST     | oauth/token/refresh                     | passport.token.refresh            | Laravel\Passport\Http\Controllers\TransientTokenController@refresh        | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | GET|HEAD | oauth/tokens                            | passport.tokens.index             | Laravel\Passport\Http\Controllers\AuthorizedAccessTokenController@forUser | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | DELETE   | oauth/tokens/{token_id}                 | passport.tokens.destroy           | Laravel\Passport\Http\Controllers\AuthorizedAccessTokenController@destroy | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | GET|HEAD | password/confirm                        | password.confirm                  | App\Http\Controllers\Auth\ConfirmPasswordController@showConfirmForm       | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | POST     | password/confirm                        |                                   | App\Http\Controllers\Auth\ConfirmPasswordController@confirm               | web        |
|        |          |                                         |                                   |                                                                           | auth       |
|        | POST     | password/email                          | password.email                    | App\Http\Controllers\Auth\ForgotPasswordController@sendResetLinkEmail     | web        |
|        | GET|HEAD | password/reset                          | password.request                  | App\Http\Controllers\Auth\ForgotPasswordController@showLinkRequestForm    | web        |
|        | POST     | password/reset                          | password.update                   | App\Http\Controllers\Auth\ResetPasswordController@reset                   | web        |
|        | GET|HEAD | password/reset/{token}                  | password.reset                    | App\Http\Controllers\Auth\ResetPasswordController@showResetForm           | web        |
|        | GET|HEAD | register                                | register                          | App\Http\Controllers\Auth\RegisterController@showRegistrationForm         | web        |
|        |          |                                         |                                   |                                                                           | guest      |
|        | POST     | register                                |                                   | App\Http\Controllers\Auth\RegisterController@register                     | web        |
|        |          |                                         |                                   |                                                                           | guest      |
+--------+----------+-----------------------------------------+-----------------------------------+---------------------------------------------------------------------------+------------+
