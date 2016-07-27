<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    function get()
    {
        return response()->json(User::find(Auth::user()));
    }

    function update(Request $request)
    {
        User::find(Auth::user())->update([
            'name' => $request->input('name'),
            'first_name' => $request->input('first_name'),
            'email' => $request->input('email'),
            'last_name' => $request->input('last_name'),
            'sex' => $request->input('sex'),
            'birthday' => $request->input('birthday')]);
    }

    function remove()
    {
        User::destroy(Auth::user());
    }
}