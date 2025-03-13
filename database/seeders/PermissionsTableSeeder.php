<?php

namespace Database\Seeders;

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
        $Permissionitems = [
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
                'name'        => 'Can Restore Users',
                'slug'        => 'restore.users',
                'description' => 'Can restore users',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Impersonate Users',
                'slug'        => 'impersonate.users',
                'description' => 'Can impersonate users',
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
            [
                'name'        => 'Can View Categories',
                'slug'        => 'view.categories',
                'description' => 'Can view categories',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Create Categories',
                'slug'        => 'create.categories',
                'description' => 'Can create new categories',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Edit Categories',
                'slug'        => 'edit.categories',
                'description' => 'Can edit categories',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Delete Categories',
                'slug'        => 'delete.categories',
                'description' => 'Can delete categories',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can View Roles',
                'slug'        => 'view.roles',
                'description' => 'Can view roles',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Create Roles',
                'slug'        => 'create.roles',
                'description' => 'Can create new roles',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Edit Roles',
                'slug'        => 'edit.roles',
                'description' => 'Can edit roles',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Delete Roles',
                'slug'        => 'delete.roles',
                'description' => 'Can delete roles',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Restore Roles',
                'slug'        => 'restore.roles',
                'description' => 'Can restore roles',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can View Permissions',
                'slug'        => 'view.permissions',
                'description' => 'Can view permissions',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Create Permissions',
                'slug'        => 'create.permissions',
                'description' => 'Can create new permissions',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Edit Permissions',
                'slug'        => 'edit.permissions',
                'description' => 'Can edit permissions',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Delete Permissions',
                'slug'        => 'delete.permissions',
                'description' => 'Can delete permissions',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Restore Permissions',
                'slug'        => 'restore.permissions',
                'description' => 'Can restore permissions',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Super Admin Permissions',
                'slug'        => 'super.admin',
                'description' => 'Can do it all',
                'model'       => 'Permission',
            ],
        ];

        /*
         * Add Permission Items
         *
         */
        foreach ($Permissionitems as $Permissionitem) {
            $newPermissionitem = config('roles.models.permission')::where('slug', '=', $Permissionitem['slug'])->first();
            if ($newPermissionitem === null) {
                $newPermissionitem = config('roles.models.permission')::create([
                    'name'          => $Permissionitem['name'],
                    'slug'          => $Permissionitem['slug'],
                    'description'   => $Permissionitem['description'],
                    'model'         => $Permissionitem['model'],
                ]);
            }
        }
    }
}
