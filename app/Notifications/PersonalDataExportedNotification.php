<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Spatie\PersonalDataExport\Notifications\PersonalDataExportedNotification as SpatiePersonalDataExportedNotification;

class PersonalDataExportedNotification extends SpatiePersonalDataExportedNotification
{
    public static $toMailCallback;
    public $zipFilename;
    public $deletionDatetime;
    public $username;

    public function __construct(string $zipFilename)
    {
        $this->username = \Auth::User()->name;
        $this->zipFilename = $zipFilename;
        $this->deletionDatetime = now()->addDays(config('personal-data-export.delete_after_days'));
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $downloadUrl = route('personal-data-exports', $this->zipFilename);
        if (static::$toMailCallback) {
            return call_user_func(static::$toMailCallback, $notifiable, $downloadUrl);
        }

        return (new MailMessage())
            ->greeting(trans('emails.personal-data-exports.notifications.greeting', ['username' => $this->username]))
            ->subject(trans('emails.personal-data-exports.notifications.subject'))
            ->line(trans('emails.personal-data-exports.notifications.instructions'))
            ->action(trans('emails.personal-data-exports.notifications.action'), $downloadUrl)
            ->line(trans('emails.personal-data-exports.notifications.deletion_message', ['date' => $this->deletionDatetime->format('m/d/Y @ h:i a')]));
    }

    public static function toMailUsing($callback)
    {
        static::$toMailCallback = $callback;
    }
}
