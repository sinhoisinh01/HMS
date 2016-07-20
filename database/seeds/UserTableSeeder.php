<?php

use App\User;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create(['id'=>'0','email'=>'b','first_name'=>'Minh','last_name'=>'Nguyen','sex'=>true,'birthday'=>'1995-11-19']);
        User::create(['id'=>'1','email'=>'a','first_name'=>'Arnaud','last_name'=>'Barre','sex'=>true,'birthday'=>'1994-06-05']);
    }
}