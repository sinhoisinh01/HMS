<?php

use App\Models\Construction;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create(['name' => 'government']);
        $this->call('SupplierTableSeeder');
        Construction::create(['user_id' => 1, 'name' => 'government', 'supplier_id' => 31]);
        $this->call('WorkTableSeeder');
        $this->call('ResourceTableSeeder');
        $this->call('ResourceSupplierTableSeeder');
        $this->call('ResourceWorkTableSeeder');
    }
}
