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
        $suppliers = [['name' => 'An Giang', 'user_id' => 1],
            ['name' => 'Bà Rịa- Vũng Tàu', 'user_id' => 1],
            ['name' => 'Bạc Liêu', 'user_id' => 1],
            ['name' => 'Bắc Kạn', 'user_id' => 1],
            ['name' => 'Bắc Giang', 'user_id' => 1],
            ['name' => 'Bắc Ninh', 'user_id' => 1],
            ['name' => 'Bến Tre', 'user_id' => 1],
            ['name' => 'Bình Dương', 'user_id' => 1],
            ['name' => 'Bình Định', 'user_id' => 1],
            ['name' => 'Bình Phước', 'user_id' => 1],
            ['name' => 'Bình Thuận', 'user_id' => 1],
            ['name' => 'Cà Mau', 'user_id' => 1],
            ['name' => 'Cao Bằng', 'user_id' => 1],
            ['name' => 'Cần Thơ', 'user_id' => 1],
            ['name' => 'Đà Nẵng', 'user_id' => 1],
            ['name' => 'ĐắK LắK', 'user_id' => 1],
            ['name' => 'ĐắK Nông', 'user_id' => 1],
            ['name' => 'Đồng Nai', 'user_id' => 1],
            ['name' => 'Đồng Tháp', 'user_id' => 1],
            ['name' => 'Điện Biên', 'user_id' => 1],
            ['name' => 'Gia Lai', 'user_id' => 1],
            ['name' => 'Hà Giang', 'user_id' => 1],
            ['name' => 'Hà Nam', 'user_id' => 1],
            ['name' => 'Hà Nội', 'user_id' => 1],
            ['name' => 'Hà Tĩnh', 'user_id' => 1],
            ['name' => 'Hải Dương', 'user_id' => 1],
            ['name' => 'Hải Phòng', 'user_id' => 1],
            ['name' => 'Hòa Bình', 'user_id' => 1],
            ['name' => 'Hậu Giang', 'user_id' => 1],
            ['name' => 'Hưng Yên', 'user_id' => 1],
            ['name' => 'TP. Hồ Chí Minh', 'user_id' => 1]];
        Supplier::insert($suppliers);
    }
}