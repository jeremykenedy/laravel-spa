<?php

namespace App\Models;

use App\Models\SocialiteProvider;
use App\Notifications\ResetPasswordNotification;
use App\Notifications\VerifyEmailNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use jeremykenedy\LaravelRoles\Traits\HasRoleAndPermission;
use Laravel\Sanctum\HasApiTokens;
use Spatie\PersonalDataExport\ExportsPersonalData;
use Spatie\PersonalDataExport\PersonalDataSelection;

class User extends Authenticatable implements ExportsPersonalData, MustVerifyEmail
{
    use HasFactory, Notifiable, HasApiTokens, HasRoleAndPermission;

    /**
     * The accessors to append to the model's array.
     *
     * @var array
     */
    protected $appends = [
        'roles',
        'avatar',
        'providers',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'theme_dark',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'theme_dark'        => 'boolean',
        'email_verified_at' => 'datetime',
    ];

    public function selectPersonalData(PersonalDataSelection $personalData): void {
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

    public function personalDataExportName(): string {
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
}
