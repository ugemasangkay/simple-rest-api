<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'total_value',
        'user_id',
    ];

    protected $casts = [
        'date'  => 'date:Y-m-d',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Create a new order.
     *
     * @param string $date
     * @param float $totalValue
     * @param int $userId
     * @return Order
     */
    public static function createOrder($date, $totalValue, $userId)
    {
        return self::create([
            'date' => $date,
            'total_value' => $totalValue,
            'user_id' => $userId,
        ]);
    }
}
