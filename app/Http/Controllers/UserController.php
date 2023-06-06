<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Store a new user.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $user = User::createUser($request->input('name'));
        return response()->json($user, 201);
    }

    /**
     * Get the list of all users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Get the user with all related orders.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($userId)
    {
        $user = User::getUserWithOrders($userId);

        if (isset($user['orders']) === true) {
            $sumTotalValue = $user->orders->sum('total_value');
            $user->sum_total_value = $sumTotalValue;
        }

        return response()->json($user);
    }

    /**
     * Update the name of a user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $userId)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $user = User::findOrFail($userId);
        $user->name = $request->input('name');
        $user->save();
        return response()->json($user);
    }
}
