<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\CommunityPhoto;
use Illuminate\Database\Seeder;

class JimAlveyPhotosSeeder extends Seeder
{
    public function run(): void
    {
        // Get or create a user for the photos
        $user = User::where('email', 'admin@agewatchafrica.com')->first();

        if (!$user) {
            $user = User::create([
                'name' => 'AgeWatch Admin',
                'email' => 'admin@agewatchafrica.com',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]);
        }

        $photos = [
            [
                'title' => 'Jim Alvey - Kenya Safari Adventure',
                'image_url' => '/storage/community-photos/jim-alvey-1.jpg',
                'caption' => 'Amazing wildlife viewing across Kenya parks and preserves',
            ],
            [
                'title' => 'Jim Alvey - Kenya Safari Adventure',
                'image_url' => '/storage/community-photos/jim-alvey-2.jpg',
                'caption' => 'Experiencing the Big 5 with AgeWatchAfrica',
            ],
            [
                'title' => 'Jim Alvey - Kenya Safari Adventure',
                'image_url' => '/storage/community-photos/jim-alvey-3.jpg',
                'caption' => 'Customized safari adventure for mature travelers',
            ],
            [
                'title' => 'Jim Alvey - Kenya Safari Adventure',
                'image_url' => '/storage/community-photos/jim-alvey-4.jpg',
                'caption' => 'Unforgettable moments in Kenya',
            ],
            [
                'title' => 'Jim Alvey - Kenya Safari Adventure',
                'image_url' => '/storage/community-photos/jim-alvey-5.jpg',
                'caption' => 'Safari adventure with AgeWatchAfrica',
            ],
            [
                'title' => 'Jim Alvey - Kenya Safari Adventure',
                'image_url' => '/storage/community-photos/jim-alvey-6.jpg',
                'caption' => 'Exploring Kenya with comfort and care',
            ],
            [
                'title' => 'Jim Alvey - Kenya Safari Adventure',
                'image_url' => '/storage/community-photos/jim-alvey-7.jpg',
                'caption' => 'The perfect African adventure',
            ],
        ];

        foreach ($photos as $photo) {
            CommunityPhoto::create([
                'user_id' => $user->id,
                'title' => $photo['title'],
                'image_url' => $photo['image_url'],
                'caption' => $photo['caption'],
                'status' => 'approved',
                'moderated_by' => $user->id,
                'moderated_at' => now(),
            ]);
        }

        echo "Successfully added " . count($photos) . " photos from Jim Alvey's Kenya safari.\n";
    }
}
