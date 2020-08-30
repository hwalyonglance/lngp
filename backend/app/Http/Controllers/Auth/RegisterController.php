<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use Laravel\Passport\Client;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
    public function store() {
        $validator = Validator::make(request()->all(), [
			'name' => 'required',
			'email' => 'required|email',
			'password' => 'required',
			'passwordConfirm' => 'required|same:password',
        ]);
        if ($validator->fails()) {
			return response()->json(['error'=>$validator->errors()]);
        }
        $postArray = request()->all();
        $postArray['password'] = bcrypt($postArray['password']);
        $user = User::create($postArray);
        $success['token'] =  $user->createToken('LaraPassport')->accessToken;
        $success['name'] =  $user->name;
        return response()->json([
			'status' => 'success',
			'data' => $success,
        ]);
	}

	function create2(Request $request) {
		/**
		 * Get a validator for an incoming registration request.
		 *
		 * @param  array  $request
		 * @return \Illuminate\Contracts\Validation\Validator
		 */
		$valid = validator($request->only('email', 'name', 'password','passwordConfirm','client_id','client_secret'), [
			'name' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => 'required|string|min:6',
			'passwordConfirm' => 'required|same:password',
			'client_id' => 'required',
			'client_secret' => 'required',
		]);

		if ($valid->fails()) {
			$jsonError=response()->json($valid->errors()->all(), 400);
			$jsonError['status']=false;
			return \Response::json($jsonError, 400);
		}

		$data = request()->only('email','name','password');

		$user = User::create([
			'name' => $data['name'],
			'email' => $data['email'],
			'password' => Hash::make($data['password']),
		]);

		// And created user until here.

		$client = Client::
					where('id',$request->client_id)
					->where('secret',$request->secret)
					->where('provider', 'users')
					->where('password_client', 1)
					->where('revoked', 0)
					->firstOrFail();

		// Is this $request the same request? I mean Request $request? Then wouldn't it mess the other $request stuff? Also how did you pass it on the $request in $proxy? Wouldn't Request::create() just create a new thing?

		$request->request->add([
			'grant_type'    => 'password',
			'client_id'     => $client->id,
			'client_secret' => $client->secret,
			'username'      => $data['email'],
			'password'      => $data['password'],
			'scope'         => null,
		]);

		// Fire off the internal request.
		$token = Request::create(
			'oauth/token',
			'POST'
		);
		return \Route::dispatch($token);
	}
}
