<?php

namespace App\Models;

use App\Notifications\ResetPasswordNotification;
use App\Notifications\VerifyEmailNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use jeremykenedy\LaravelRoles\Traits\HasRoleAndPermission;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\PersonalDataExport\ExportsPersonalData;
use Spatie\PersonalDataExport\PersonalDataSelection;

class User extends Authenticatable implements ExportsPersonalData, MustVerifyEmail
{
    use HasFactory;
    use Notifiable;
    use HasApiTokens;
    use HasRoleAndPermission;
    use LogsActivity;
    use Prunable;
    use SoftDeletes;

    /**
     * The accessors to append to the model's array.
     *
     * @var array
     */
    protected $appends = [
        'roles',
        'permissions',
        'avatar',
        'providers',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'theme_dark',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'theme_dark'        => 'boolean',
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    public function selectPersonalData(PersonalDataSelection $personalData): void
    {
        $personalData
            ->add('user.json', [
                'name'              => $this->name,
                'email'             => $this->email,
                'theme'             => $this->theme_dark ? 'Dark' : 'Light',
                'email_verified_at' => $this->email_verified_at,
                // 'roles'             => $this->getRoles(),
                'avatar'            => $this->avatar,
            ]);
        // ->addFile(storage_path("avatars/{$this->id}.jpg"))
        // ->addFile('other-user-data.xml', 's3');
    }

    public function personalDataExportName(): string
    {
        $userName = Str::slug($this->name);

        return "personal-data-{$userName}.zip";
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmailNotification());
    }

    public function getRolesAttribute()
    {
        return $this->getRoles();
    }

    public function getPermissionsAttribute()
    {
        return $this->getPermissions();
    }

    public function getAvatarAttribute()
    {
        return 'https://www.gravatar.com/avatar/'.md5(Str::lower($this->email)).'.jpg?s=200&d=mp';
    }

    public function getProvidersAttribute()
    {
        return $this->socialiteProviders;
    }

    /**
     * Get the socialite providers.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function socialiteProviders()
    {
        return $this->hasMany(SocialiteProvider::class);
    }

    public function canImpersonate()
    {
        return $this->hasOneRole(config('roles.models.role')::whereName('Super Admin')->first('id')->id);
    }

    public function canBeImpersonated()
    {
        return ! $this->hasOneRole(config('roles.models.role')::whereName('Super Admin')->first('id')->id);
    }

    public function isImpersonated()
    {
        $token = $this->currentAccessToken();

        return $token->name == 'IMPERSONATION token';
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['name', 'email']);
        // Chain fluent methods for configuration options
    }

    protected function pruning(): void
    {
        // ... Things to do before pruning the users.
    }

    public function prunable(): Builder
    {
        return static::where('created_at', '<=', now()->subMonth(3));
    }
}
