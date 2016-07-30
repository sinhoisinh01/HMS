<?php

use App\Supplier;
use Illuminate\Database\Seeder;

class SupplierTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Supplier::create(['id'=>'HCM','name'=>'Hồ Chí Minh','address'=>'']);
        Supplier::create(['id'=>'HN','name'=>'Hà Nội','address'=>'']);
    }
}