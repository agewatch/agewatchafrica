<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class BookingCreated extends Notification
{
    use Queueable;

    public function __construct(private Booking $booking)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $this->booking->loadMissing('trip');
        $trip = $this->booking->trip;
        $title = $trip ? $trip->title : 'Trip booking';

        return (new MailMessage)
            ->subject('New booking received')
            ->greeting('Hello Admin,')
            ->line("A new booking has been created for {$title}.")
            ->line('Booking ID: ' . $this->booking->id)
            ->line('User ID: ' . $this->booking->user_id)
            ->line('Status: ' . $this->booking->status)
            ->line('Payment Status: ' . $this->booking->payment_status)
            ->line('Total Amount: ' . $this->booking->total_amount . ' ' . $this->booking->currency);
    }

    public function toArray(object $notifiable): array
    {
        $this->booking->loadMissing('trip');
        $trip = $this->booking->trip;

        return [
            'booking_id' => $this->booking->id,
            'trip_id' => $trip?->id,
            'trip_title' => $trip?->title,
            'user_id' => $this->booking->user_id,
            'status' => $this->booking->status,
            'payment_status' => $this->booking->payment_status,
            'total_amount' => $this->booking->total_amount,
            'currency' => $this->booking->currency,
        ];
    }
}
