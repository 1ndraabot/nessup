<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = $request->validate([
            'name' => 'required|string|max:255',
    
            'email' => 'required|email|unique:users,email',
    
            'number_phone' => 'required|string|unique:users,number_phone',
    
            'password' => 'required|min:6|confirmed',
        ]);

        User::create([
            'name' => $request->name,
    
            'email' => $request->email,
    
            'number_phone' => $request->number_phone,
    
            'password' => Hash::make($request->password),
        ]);

        return redirect()
            ->route('register')
            ->with('success', 'Register Success');
    }
}