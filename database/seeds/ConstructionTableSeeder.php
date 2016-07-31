<?php

use App\Construction;
use Illuminate\Database\Seeder;

class ConstructionTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Construction::create(['name'=>'MinhProject','supplier_id'=>'31','address'=>'test','investor'=>'test','contractor'=>'test','type'=>'',
        'design_type'=>'','level'=>'','user_id'=>'0']);
    }
}