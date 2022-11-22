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
        $superAdminRole = config('roles.models.role')::whereName('Super Admin')->first();
        $adminRole = config('roles.models.role')::whereName('Admin')->first();
        $moderatorRole = config('roles.models.role')::whereName('Moderator')->first();
        $editorRole = config('roles.models.role')::whereName('Editor')->first();
        $userRole = config('roles.models.role')::whereName('User')->first();

        $seededSuperAdmin = 'superadmin@superadmin.com';
        $user = User::where('email', '=', $seededSuperAdmin)->first();
        if ($user === null) {
            $user = User::withTrashed()->updateOrCreate([
                'name'                          => 'Rick Sanchez',
                'email'                         => $seededSuperAdmin,
                'password'                      => Hash::make('password'),
                'email_verified_at'             => now(),
                'theme_dark'                    => false,
            ]);
            $user->attachRole($superAdminRole);
        }

        $seededAdmin = 'admin@admin.com';
        $user = User::where('email', '=', $seededAdmin)->first();
        if ($user === null) {
            $user = User::withTrashed()->updateOrCreate([
                'name'                          => 'Morty Smith',
                'email'                         => $seededAdmin,
                'password'                      => Hash::make('password'),
                'email_verified_at'             => now(),
                'theme_dark'                    => false,
            ]);
            $user->attachRole($adminRole);
        }

        $seededUser = 'user@user.com';
        $user = User::where('email', '=', $seededUser)->first();
        if ($user === null) {
            $user = User::withTrashed()->updateOrCreate([
                'name'                          => 'Beth Smith',
                'email'                         => $seededUser,
                'password'                      => Hash::make('password'),
                'email_verified_at'             => now(),
                'theme_dark'                    => false,
            ]);
            $user->attachRole($userRole);
        }
    }
}
