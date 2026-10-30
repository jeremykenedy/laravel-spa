<?php

declare(strict_types=1);

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

/**
 * Create a signed in user, optionally holding a single permission.
 */
function signInWithPermission(?string $slug = null): User
{
    $user = User::factory()->create();

    if ($slug) {
        $user->attachPermission(Permission::create([
            'name' => $slug,
            'slug' => $slug,
            'description' => '',
            'model' => 'Permission',
        ]));
    }

    return Sanctum::actingAs($user);
}

function seededRole(): Role
{
    return Role::create([
        'name' => 'Super Admin',
        'slug' => 'superadmin',
        'description' => 'Super Admin Role',
        'level' => 5,
    ]);
}

function seededPermission(): Permission
{
    return Permission::create([
        'name' => 'Can View Users',
        'slug' => 'view.users',
        'description' => '',
        'model' => 'Permission',
    ]);
}

it('refuses to delete a role without the delete.roles permission', function () {
    $role = seededRole();
    signInWithPermission();

    $this->deleteJson("/api/roles/delete/role/{$role->id}")->assertForbidden();

    $this->assertNotSoftDeleted($role);
});

it('deletes a role with the delete.roles permission', function () {
    $role = seededRole();
    signInWithPermission('delete.roles');

    $this->deleteJson("/api/roles/delete/role/{$role->id}")->assertOk();

    $this->assertSoftDeleted($role);
});

it('refuses to delete a permission without the delete.permissions permission', function () {
    $permission = seededPermission();
    signInWithPermission();

    $this->deleteJson("/api/permissions/delete/permission/{$permission->id}")->assertForbidden();

    $this->assertNotSoftDeleted($permission);
});

it('deletes a permission with the delete.permissions permission', function () {
    $permission = seededPermission();
    signInWithPermission('delete.permissions');

    $this->deleteJson("/api/permissions/delete/permission/{$permission->id}")->assertOk();

    $this->assertSoftDeleted($permission);
});

it('requires authentication to delete roles and permissions', function () {
    $role = seededRole();
    $permission = seededPermission();

    $this->deleteJson("/api/roles/delete/role/{$role->id}")->assertUnauthorized();
    $this->deleteJson("/api/permissions/delete/permission/{$permission->id}")->assertUnauthorized();

    $this->assertNotSoftDeleted($role);
    $this->assertNotSoftDeleted($permission);
});
