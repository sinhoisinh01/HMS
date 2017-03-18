<?php

namespace App\Http\Controllers;

use App\Models\Subcategory;
use App\Models\SubcategoryWork;
use App\Models\Work;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller;

class ExportGetDataController extends Controller
{
    public function estimateTableData( $categoryID ){
        $subcategories = Subcategory::where('category_id', $categoryID)
            ->select("subcategories.id","subcategories.name")
            ->orderBy('subcategories.no')
            ->with(['subcategoryWorks'=> function($q){
                        $q->select("subcategory_work.subcategory_id", "subcategory_work.id", "works.code","works.name","works.unit","value");
                        $q->orderBy('no');
                        $q->join('works', 'subcategory_work.work_id', '=', 'works.id');
                    },
                    
                    'subcategoryWorks.descriptions'=> function($q){
                        $q->select("descriptions.subcategoryWork_id","descriptions.name","amount","length","width","height","value");
                        $q->orderBy('no');
                    }
                    ])
            ->get()->toArray();

        $array = []; 
        $subcategoriesLength = count($subcategories); 
        $no = 1;

        for($i = 0; $i < $subcategoriesLength; $i++){
            $subcategory = $subcategories[$i];
            unset($subcategory['id']);
            unset($subcategory['subcategory_works']);// remove unecessary properties
            array_unshift($subcategory,"*******");// add empty element to array for empty column
            array_unshift($subcategory,$no); // add number order 
            $array[] = $subcategory;
            $no++;

            $worksLength = count($subcategories[$i]["subcategory_works"]);
            for($j = 0; $j < $worksLength; $j++){
                $work = $subcategories[$i]["subcategory_works"][$j];
                unset($work["subcategory_id"]);
                unset($work['id']);
                unset($work['descriptions']);
                array_unshift($work,$no);
                $array[] = $work;
                $no++;
                $descriptionsLength = count($subcategories[$i]["subcategory_works"][$j]["descriptions"]);
                for($k = 0; $k < $descriptionsLength; $k++)
                {
                    $description = $subcategories[$i]["subcategory_works"][$j]["descriptions"][$k];
                    unset($description["subcategoryWork_id"]);
                    array_unshift($description,"");
                    array_unshift($description,$no);
                    $description = array_slice($description,0,3,true) + array("unit"=>"") + array_slice($description,3,(count($description)-1),true);
                    $array[] = $description;
                    $no++;
                }
            }
        }
        return $array;
    }

    // return values with Google Spreadsheet Format
    public function estimateTableFormat( $categoryID )
    {
        $data = $this->estimateTableData( $categoryID );

        $values = [
            [
                'TT', 'Mã', 'Hạng mục/Công tác', 'Đơn vị', 'Số lượng', 'Dài', 
                'Rộng', 'Cao', 'Khối lượng', 'Đơn giá', 'Thành tiền'
            ]
        ];

        for ( $i = 0; $i < sizeof( $data ); $i++ ) {
            $tmpArr = [];  
            // Column A: STT
            array_push( $tmpArr, ($i + 1) );

            // Column B: if code exists, push code, else, push 1st element
            ( isset( $data[$i]["code"] ) ) ?
                array_push( $tmpArr, $data[$i]["code"] ) : array_push( $tmpArr, $data[$i][1] );

            // Column C:
            array_push( $tmpArr, $data[$i]["name"] );

            // Column D: if unit exists, push unit, else, push null character
            ( isset( $data[$i]["unit"] ) ) ?
                array_push( $tmpArr, $data[$i]["unit"] ) : array_push( $tmpArr, '' );

            // Column E: if amount exists, push unit, else, push null character
            ( isset( $data[$i]["amount"] ) ) ?
                array_push( $tmpArr, $data[$i]["amount"] ) : array_push( $tmpArr, '' );

            // Column F: if amount exists, push unit, else, push null character
            ( isset( $data[$i]["length"] ) ) ?
                array_push( $tmpArr, $data[$i]["length"] ) : array_push( $tmpArr, '' );

            // Column G: if width exists, push unit, else, push null character
            ( isset( $data[$i]["width"] ) ) ?
                array_push( $tmpArr, $data[$i]["width"] ) : array_push( $tmpArr, '' );

            // Column H: if height exists, push unit, else, push null character
            ( isset( $data[$i]["height"] ) ) ?
                array_push( $tmpArr, $data[$i]["height"] ) : array_push( $tmpArr, '' );

            // Column I: if value exists, push unit, else, push null character
            ( isset( $data[$i]["value"] ) ) ?
                array_push( $tmpArr, $data[$i]["value"] ) : array_push( $tmpArr, '' );

            // Column J: if price exists, push unit, else, push null character
            ( isset( $data[$i]["price"] ) ) ?
                array_push( $tmpArr, $data[$i]["price"] ) : array_push( $tmpArr, '' );

            // Column K: if row is work (has price), push formular to get total, else, push null character
            ( isset( $data[$i]["price"] ) ) ?
                array_push( "=I" . ( $i + 1 ) . "+J" . ( $i + 1 ) ) : array_push( $tmpArr, '' );

            // push to values array
            array_push( $values, $tmpArr );
        }
        return $values;
    }

    public function summaryTableData( $constructionID, $categoryID )
    {
        $constructionID = 3; $categoryID = 1;
        $subcategories = Subcategory::where("category_id", $categoryID)
        ->select("subcategories.id")
        ->with([ 
            "works" => function($q){
                $q->select("works.id");
            }, 
            "works.resources" => function($q) use ($constructionID) {
                $q->select("resources.id", "resources.code","price");
                $q->join("construction_resource","construction_resource.resource_id","=","resources.id");
                $q->where("construction_resource.construction_id",$constructionID);
               

            }
        ])
        ->get()
        ->toArray();

        $labourCost = 0;
        $machineCost = 0;
        $materialCost = 0;
        $cost = [];

        //echo '<pre>'; print_r($subcategories); echo '</pre>';
        foreach($subcategories as $subcategory)
            foreach($subcategory['works'] as $work)
                foreach($work['resources'] as $resource){
                    if( substr($resource['code'],0,1) === "N" )
                    {
                        $labourCost += $resource['price'];
                    }
                    if( substr($resource['code'],0,1) === "M" )
                    {
                        $machineCost += $resource['price'];
                    }
                    if( substr($resource['code'],0,1) === "V" )
                    {
                        $materialCost += $resource['price'];
                    }
                }
        array_push( $cost, $labourCost, $machineCost, $materialCost);
        return $cost;
    }
}