<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminAuthController extends Controller
{
    public function showRegister () {
        return Inertia::render('admin/auth/Register');
    }

    public function register (Request $request) {
        $validated = $request->validate ([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email',
            'number_phone' => 'required|unique:admins,number_phone',
            'password' => 'required|min:6|confirmed',
        ]);

        $admin = Admin::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'number_phone' => $validated['number_phone'],
            'password' => $validated['password'],
        ]);

        Auth::guard('admin') -> login($admin);
        return redirect('/admin/dashboard');
    }

    public function showLogin () {
        return Inertia::render('admin/auth/Login');
    }

    public function login (Request $request) {
        $credentials = $request -> validate ([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (
            Auth::guard('admin') -> attempt(
                $credentials
            )
        ){
            $request->session()->regenerate();
            return redirect('/admin/dashboard');
        }

        return back()->withErrors([
            'email'=>'Email atau Password salah'
        ]);
    }

    public function logout(Request $request){
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin/login');
    }
}
