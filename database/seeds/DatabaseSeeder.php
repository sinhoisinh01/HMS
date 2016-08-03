<?php

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
        $this->call('SupplierTableSeeder');
        $this->call('WorkTableSeeder');
        $this->call('ResourceTableSeeder');
        $this->call('ResourceSupplierTableSeeder');
        $this->call('ResourceWorkTableSeeder');
    }
}
