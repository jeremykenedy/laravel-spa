<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * Permission Types
         *
         */
        $items = [
            [
                'name'        => 'Can View Users',
                'slug'        => 'view.users',
                'description' => 'Can view users',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Create Users',
                'slug'        => 'create.users',
                'description' => 'Can create new users',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Edit Users',
                'slug'        => 'edit.users',
                'description' => 'Can edit users',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Delete Users',
                'slug'        => 'delete.users',
                'description' => 'Can delete users',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can View Articles',
                'slug'        => 'view.articles',
                'description' => 'Can view articles',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Create Articles',
                'slug'        => 'create.articles',
                'description' => 'Can create new articles',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Edit Articles',
                'slug'        => 'edit.articles',
                'description' => 'Can edit articles',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Delete Articles',
                'slug'        => 'delete.articles',
                'description' => 'Can delete articles',
                'model'       => 'Permission',
            ],
        ];

        /*
         * Add Permission Items
         *
         */
        $uniqueKeyOne = 'slug';
        $model = new Permission();

        foreach ($items as $item) {
            $model::withTrashed()->updateOrCreate([
                $uniqueKeyOne => $item[$uniqueKeyOne],
            ], $item);
        }


    }
}
