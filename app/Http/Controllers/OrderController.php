<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Store a new order.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $order = Order::createOrder(
            $request->input('date'),
            $request->input('total_value'),
            $request->input('user_id')
        );
        return response()->json($order, 201);
    }
}
