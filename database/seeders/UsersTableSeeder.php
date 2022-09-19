<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $seededUser = 'user@user.com';
        $user = User::where('email', '=', $seededUser)->first();
        if ($user === null) {
            $user = User::create([
                'name'                          => 'Rick Sanchez',
                'email'                         => $seededUser,
                'password'                      => Hash::make('password'),
                'email_verified_at'             => now(),
                'theme_dark'                    => false,
            ]);
        }
    }
}
