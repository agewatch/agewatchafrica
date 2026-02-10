<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TripController as UserTripController;
use App\Http\Controllers\Api\BookingController as UserBookingController;
use App\Http\Controllers\Api\SupportMessageController;
use App\Http\Controllers\Api\FeedbackController as UserFeedbackController;
use App\Http\Controllers\Api\CommunityPhotoController as UserCommunityPhotoController;
use App\Http\Controllers\Api\Admin\TripController;
use App\Http\Controllers\Api\Admin\BookingController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\SupportMessageController as AdminSupportMessageController;
use App\Http\Controllers\Api\Admin\FeedbackController as AdminFeedbackController;
use App\Http\Controllers\Api\Admin\CommunityPhotoController as AdminCommunityPhotoController;
use App\Http\Controllers\Api\Admin\NotificationController as AdminNotificationController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/public/trips', [UserTripController::class, 'publicIndex']);
Route::get('/public/photos', [UserCommunityPhotoController::class, 'publicIndex']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/trips', [UserTripController::class, 'index']);
    Route::get('/trips/{trip}', [UserTripController::class, 'show']);
    Route::get('/bookings', [UserBookingController::class, 'index']);
    Route::post('/bookings', [UserBookingController::class, 'store']);
    Route::get('/support/messages', [SupportMessageController::class, 'index']);
    Route::post('/support/messages', [SupportMessageController::class, 'store']);
    Route::get('/feedback', [UserFeedbackController::class, 'index']);
    Route::post('/feedback', [UserFeedbackController::class, 'store']);
    Route::get('/community/photos', [UserCommunityPhotoController::class, 'index']);
    Route::post('/community/photos', [UserCommunityPhotoController::class, 'store']);

    Route::post('/email/verification-notification', function (Illuminate\Http\Request $request) {
        $request->user()->sendEmailVerificationNotification();

        return response()->json(['message' => 'Verification link sent']);
    })->middleware('throttle:6,1');

    Route::get('/email/verify/{id}/{hash}', function (Illuminate\Foundation\Auth\EmailVerificationRequest $request) {
        $request->fulfill();

        return response()->json(['message' => 'Email verified']);
    })->middleware('signed')->name('verification.verify');

    Route::middleware('admin')->group(function () {
        Route::get('/admin/ping', function () {
            return response()->json(['message' => 'Admin access confirmed']);
        });

        Route::apiResource('/admin/trips', TripController::class);
        Route::post('/admin/trips/{trip}/media', [TripController::class, 'addMedia']);
        Route::get('/admin/trips/{trip}/media', [TripController::class, 'listMedia']);
        Route::delete('/admin/trips/{trip}/media/{media}', [TripController::class, 'deleteMedia']);
        Route::put('/admin/trips/{trip}/media/order', [TripController::class, 'reorderMedia']);
        Route::put('/admin/trips/{trip}/media/{media}/cover', [TripController::class, 'setCover']);
        Route::get('/admin/bookings', [BookingController::class, 'index']);
        Route::get('/admin/bookings/{booking}', [BookingController::class, 'show']);
        Route::put('/admin/bookings/{booking}', [BookingController::class, 'update']);
        Route::get('/admin/users', [UserController::class, 'index']);
        Route::get('/admin/users/{user}', [UserController::class, 'show']);
        Route::put('/admin/users/{user}', [UserController::class, 'update']);
        Route::get('/admin/support/messages', [AdminSupportMessageController::class, 'index']);
        Route::put('/admin/support/messages/{supportMessage}', [AdminSupportMessageController::class, 'update']);
        Route::get('/admin/feedback', [AdminFeedbackController::class, 'index']);
        Route::put('/admin/feedback/{feedback}', [AdminFeedbackController::class, 'update']);
        Route::get('/admin/photos', [AdminCommunityPhotoController::class, 'index']);
        Route::put('/admin/photos/{communityPhoto}', [AdminCommunityPhotoController::class, 'update']);
        Route::get('/admin/notifications/unread-count', [AdminNotificationController::class, 'unreadCount']);
        Route::get('/admin/notifications', [AdminNotificationController::class, 'index']);
        Route::put('/admin/notifications/{notification}/read', [AdminNotificationController::class, 'markRead']);
        Route::put('/admin/notifications/read-all', [AdminNotificationController::class, 'markAllRead']);
    });
});
