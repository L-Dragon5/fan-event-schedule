<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class UserController extends Controller
{
    private $successStatus = 200;
    private $errorStatus = 422;
    
    /**
     * Attempt to login user
     */
    public function login(Request $request) {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('FanEventScheduleToken')->accessToken;
            $response = ['token' => $token];

            return response()->json($response, $this->successStatus);
        } else {
            $response = ['message' => 'Incorrect login credentials provided'];

            return response()->json($response, $this->errorStatus);
        }
    }

    /**
     * Register a user account
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if($validator->fails()) {
            return response()->json(['message' => $validator->errors()], $this->errorStatus);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $response = ['token' => $user->createToken('FanEventScheduleToken')->accessToken];

        return response()->json($response, $this->successStatus);
    }
}
