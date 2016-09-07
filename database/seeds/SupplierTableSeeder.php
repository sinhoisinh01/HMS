<?php

use App\Models\Supplier;
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
        $suppliers = [['name' => 'An Giang'],
            ['name' => 'Bà Rịa- Vũng Tàu'],
            ['name' => 'Bạc Liêu'],
            ['name' => 'Bắc Kạn'],
            ['name' => 'Bắc Giang'],
            ['name' => 'Bắc Ninh'],
            ['name' => 'Bến Tre'],
            ['name' => 'Bình Dương'],
            ['name' => 'Bình Định'],
            ['name' => 'Bình Phước'],
            ['name' => 'Bình Thuận'],
            ['name' => 'Cà Mau'],
            ['name' => 'Cao Bằng'],
            ['name' => 'Cần Thơ'],
            ['name' => 'Đà Nẵng'],
            ['name' => 'ĐắK LắK'],
            ['name' => 'ĐắK Nông'],
            ['name' => 'Đồng Nai'],
            ['name' => 'Đồng Tháp'],
            ['name' => 'Điện Biên'],
            ['name' => 'Gia Lai'],
            ['name' => 'Hà Giang'],
            ['name' => 'Hà Nam'],
            ['name' => 'Hà Nội'],
            ['name' => 'Hà Tĩnh'],
            ['name' => 'Hải Dương'],
            ['name' => 'Hải Phòng'],
            ['name' => 'Hòa Bình'],
            ['name' => 'Hậu Giang'],
            ['name' => 'Hưng Yên'],
            ['name' => 'TP. Hồ Chí Minh']];
        Supplier::insert($suppliers);
    }
}