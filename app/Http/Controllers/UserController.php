<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\User;
use Auth;

class UserController extends Controller 
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }
  
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $credentials = request(['email', 'password']);
         
        if (! $token = auth()->attempt($credentials)) {
            return response()->json([
                'errors' => 'Unauthorized',
            ], 401);
        } 
        
        return $this->respondWithToken(auth()->attempt($credentials)); 
    }


    public function register(Request $request)
    { 
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
          
        ]);

        $payload = [

            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>\Hash::make($request->password)
        ];

        $user = new User($payload);
        if ($user->save()) {

            $credentials = request(['email', 'password']);

            if (! $token = auth()->attempt($credentials)) {
                return response()->json(['errors' => 'Unauthorized'], 401);
            } else {
                return $this->respondWithToken($token);
            }
            
        }else
            $response = ['success'=>false, 'data'=>'Couldnt register user'];
        
            return response()->json($response, 201);
        
    }

    public function update(){
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = [

            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>\Hash::make($request->password),
        ];

        if ($user->save()) {
            return response()->json('user updated');
        }else{
            return response()->json('user not updated');
        }
    }

     /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
    
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'success' => true,
            'user' => Auth::user(),
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]); 
    }
}