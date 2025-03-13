<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class ConnectRelationshipsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * Get Available Permissions.
         */
        $adminPermissions = Permission::all();

        $moderatorPermissions = Permission::query()
            ->where('slug', 'view.articles')
            ->orWhere('slug', 'create.articles')
            ->orWhere('slug', 'edit.articles')
            ->orWhere('slug', 'delete.articles')
            ->get();

        /**
         * Get Available Roles.
         */
        $roleAdmin = config('roles.models.role')::where('slug', '=', 'admin')->first();
        $roleSuperAdmin = config('roles.models.role')::where('slug', '=', 'superadmin')->first();
        $roleModerator = config('roles.models.role')::where('slug', '=', 'moderator')->first();

        /**
         * Attach Permissions to Roles.
         */
        foreach ($adminPermissions as $permission) {
            $roleSuperAdmin->attachPermission($permission);
        }

        foreach ($adminPermissions as $permission) {
            $roleAdmin->attachPermission($permission);
        }

        foreach ($moderatorPermissions as $permission) {
            $roleModerator->attachPermission($permission);
        }
    }
}
