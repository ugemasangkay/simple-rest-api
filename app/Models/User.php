<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Create a new user.
     *
     * @param string $name
     * @return User
     */
    public static function createUser($name)
    {
        return self::create([
            'name' => $name,
        ]);
    }

    /**
     * Get the user with all related orders.
     *
     * @param int $userId
     * @return User|null
     */
    public static function getUserWithOrders($userId)
    {
        return self::with('orders')->find($userId);
    }
}
