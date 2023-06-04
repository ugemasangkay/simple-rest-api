<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\Order;
use App\Models\User;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $users = User::all();
        foreach ($users as $user) {
            for ($i = 0; $i < 5; $i++) {
                Order::create([
                    'date' => $faker->dateTimeThisYear(),
                    'total_value' => $faker->randomFloat(2, 10, 100),
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}
