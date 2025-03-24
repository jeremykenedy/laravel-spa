<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotificationOriginal;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends ResetPasswordNotificationOriginal
{
    use Queueable;

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable): MailMessage
    {
        $resetUrl = url(config('app.url').'/reset-password/'.$this->token.'?email='.$notifiable->getEmailForPasswordReset());

        return (new MailMessage())
            ->subject(trans('emails.password.request.subject'))
            ->line(trans('emails.password.request.message'))
            ->action(trans('emails.password.request.action'), $resetUrl)
            ->line(trans('emails.password.request.goodbye'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
