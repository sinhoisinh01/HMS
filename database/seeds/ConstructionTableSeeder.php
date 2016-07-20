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
        Construction::create(['name'=>'MinhProject','supplier_id'=>'HCM_CX_DG4845','address'=>'fdsa','investor'=>'dfsa','contractor'=>'fdsa','type'=>'afdsa',
        'design_type'=>'d','level'=>'4']);
    }
}