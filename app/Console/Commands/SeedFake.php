<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Construction;
use App\Models\Subcategory;
use App\Models\SubcategoryWork;
use App\Models\User;
use Illuminate\Console\Command;

class SeedFake extends Command
{
    protected $signature = 'seedFake {constructionNumber=1} {categoryNumber=1}
    {subcategoryNumber=1} {subcategoryWorkNumber=1} {descriptionNumber=1}';

    protected $description = 'Seed database with fake data for the last user';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $totalCategories = $this->argument('constructionNumber') * $this->argument('categoryNumber');
        $totalSubcategories = $totalCategories * $this->argument('subcategoryNumber');
        $totalSubcategoryWorks = $totalSubcategories * $this->argument('subcategoryWorkNumber');
        for ($i = 0; $i < $this->argument('constructionNumber'); $i++) {
            factory('App\Models\Construction')->create(['user_id' => User::all()->last()->id]);
        }
        $this->info('Construction(s) seeded');
        foreach (Construction::all()->sortByDesc('id')->take($this->argument('constructionNumber')) as $construction) {
            for ($i = 0; $i < $this->argument('categoryNumber'); $i++) {
                factory('App\Models\Category')->create(['construction_id' => $construction->id]);
            }
        }
        $this->info('Category(ies) seeded');
        foreach (Category::all()->sortByDesc('id')->take($totalCategories) as $category) {
            for ($i = 0; $i < $this->argument('subcategoryNumber'); $i++) {
                factory('App\Models\Subcategory')->create(['category_id' => $category->id, 'no' => $i]);
            }
        }
        $this->info('Subcategory(ies) seeded');
        foreach (Subcategory::all()->sortByDesc('id')->take($totalSubcategories) as $subcategory) {
            for ($i = 0; $i < $this->argument('subcategoryWorkNumber'); $i++) {
                factory('App\Models\SubcategoryWork')->create(['subcategory_id' => $subcategory->id, 'no' => $i]);
            }
        }
        $this->info('CategoryWork(s) seeded');
        foreach (SubcategoryWork::all()->sortByDesc('id')->take($totalSubcategoryWorks) as $subcategoryWork) {
            for ($i = 0; $i < $this->argument('descriptionNumber'); $i++) {
                factory('App\Models\Description')->create(['subcategoryWork_id' => $subcategoryWork->id, 'no' => $i]);
            }
        }
        $this->info('Description(s) seeded');
    }
}