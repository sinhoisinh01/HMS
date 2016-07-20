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
        Supplier::create(['id'=>'HCM_CX_DG4845','name'=>'Minh','address'=>'ff']);
    }
}