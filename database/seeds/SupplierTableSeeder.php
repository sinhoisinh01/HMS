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
        $suppliers = [['id' => 1, 'name' => 'An Giang', 'address' => ''],
            ['id' => 2, 'name' => 'Bà Rịa- Vũng Tàu', 'address' => ''],
            ['id' => 3, 'name' => 'Bạc Liêu', 'address' => ''],
            ['id' => 4, 'name' => 'Bắc Kạn', 'address' => ''],
            ['id' => 5, 'name' => 'Bắc Giang', 'address' => ''],
            ['id' => 6, 'name' => 'Bắc Ninh', 'address' => ''],
            ['id' => 7, 'name' => 'Bến Tre', 'address' => ''],
            ['id' => 8, 'name' => 'Bình Dương', 'address' => ''],
            ['id' => 9, 'name' => 'Bình Định', 'address' => ''],
            ['id' => 10, 'name' => 'Bình Phước', 'address' => ''],
            ['id' => 11, 'name' => 'Bình Thuận', 'address' => ''],
            ['id' => 12, 'name' => 'Cà Mau', 'address' => ''],
            ['id' => 13, 'name' => 'Cao Bằng', 'address' => ''],
            ['id' => 14, 'name' => 'Cần Thơ', 'address' => ''],
            ['id' => 15, 'name' => 'Đà Nẵng', 'address' => ''],
            ['id' => 16, 'name' => 'ĐắK LắK', 'address' => ''],
            ['id' => 17, 'name' => 'ĐắK Nông', 'address' => ''],
            ['id' => 18, 'name' => 'Đồng Nai', 'address' => ''],
            ['id' => 19, 'name' => 'Đồng Tháp', 'address' => ''],
            ['id' => 20, 'name' => 'Điện Biên', 'address' => ''],
            ['id' => 21, 'name' => 'Gia Lai', 'address' => ''],
            ['id' => 22, 'name' => 'Hà Giang', 'address' => ''],
            ['id' => 23, 'name' => 'Hà Nam', 'address' => ''],
            ['id' => 24, 'name' => 'Hà Nội', 'address' => ''],
            ['id' => 25, 'name' => 'Hà Tĩnh', 'address' => ''],
            ['id' => 26, 'name' => 'Hải Dương', 'address' => ''],
            ['id' => 27, 'name' => 'Hải Phòng', 'address' => ''],
            ['id' => 28, 'name' => 'Hòa Bình', 'address' => ''],
            ['id' => 29, 'name' => 'Hậu Giang', 'address' => ''],
            ['id' => 30, 'name' => 'Hưng Yên', 'address' => ''],
            ['id' => 31, 'name' => 'TP. Hồ Chí Minh', 'address' => '']];
        Supplier::insert($suppliers);
    }
}