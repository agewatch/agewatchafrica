<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => env('ADMIN_NAME', 'AgeWatch Admin'),
            'email' => env('ADMIN_EMAIL', 'admin@agewatchafrica.com'),
            'password' => env('ADMIN_PASSWORD', 'agewatch123'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);
    }
}
