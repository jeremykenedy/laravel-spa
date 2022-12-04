<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;
use Spatie\PersonalDataExport\Notifications\PersonalDataExportedNotification as SpatiePersonalDataExportedNotification;

class PersonalDataExportedNotification extends SpatiePersonalDataExportedNotification
{
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
        return (new MailMessage)
            ->subject(trans('personal-data-exports.notifications.subject'))
            ->line(trans('personal-data-exports.notifications.instructions'))
            ->action(trans('personal-data-exports.notifications.action'), $downloadUrl)
            ->line(trans('personal-data-exports.notifications.deletion_message', ['date' => $this->deletionDatetime->format('Y-m-d H:i:s')]));
    }
}
