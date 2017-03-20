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
    public function estimateTableData( $constructionID, $categoryID ){
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

    public function analysisTableData( $cnstructionID, $categoryID ){
        $subcategories = Subcategory::where('category_id', $categoryID)
        ->select('id', 'name')
        ->orderBy('subcategories.no')
        ->with([
            'works'=> function( $q ){
                $q->select('works.id','code','name','unit','sw.value');
                $q->join('subcategory_work as sw','sw.work_id','=','works.id');
            },
            'works.resource_work' => function( $q ){
                $q->select('work_id','name','unit','price','value');
                $q->join('resources','resource_work.resource_id', '=', 'resources.id')
                ->join('construction_resource','resource_work.resource_id','=','construction_resource.resource_id');
                $q->where('construction_resource.construction_id',$constructionID)
            }
        ])
        ->get()->toArray();
    
        $analysisTableData = [];
        $subcategoriesLength = count($subcategories);
        for($i = 0; $i < $subcategoriesLength; $i++){
            $subcategory = $subcategories[$i];
            unset($subcategory['id']);
            unset($subcategory['works']);
            $analysisTableData[] = $subcategory;
            $worksLength = count($subcategories[$i]['works']);
            for($j = 0; $j < $worksLength; $j++){
                $work = $subcategories[$i]['works'][$j];
                unset($work['id']);
                unset($work['pivot']);
                unset($work['resource_work']); 
                $analysisTableData[] = $work;
                $resourcesLength = count($subcategories[$i]['works'][$j]['resource_work']);
                for($k = 0; $k < $resourcesLength; $k++){
                    $resource = $subcategories[$i]['works'][$j]['resource_work'][$k];
                    unset($resource['work_id']);
                    $analysisTableData[] = $resource;
                }
            }
        }
        return $analysisTableData;
        //return an array with all works by subcategories, each work has list of resources
        //echo '<pre>'; print_r($analysisTableData); echo '</pre>';
    }

    public function costTableData( $constructionID, $categoryID )
    {
        $subcategories = Subcategory::where("category_id", $categoryID)
        ->select("subcategories.id")
        ->with([ 
            "works" => function($q){
                $q->select("works.id");
            }, 
            "works.resources" => function($q) use ($constructionID) {
                $q->select("resources.id", "resources.code","resources.name","resources.unit","price");
                $q->join("construction_resource","construction_resource.resource_id","=","resources.id");
                $q->where("construction_resource.construction_id",$constructionID);
                $q->groupBy('code');
            }
        ])
        ->get()
        ->toArray();

        $labourMachine = [];
        $material = [];
        $prices = [];

        foreach($subcategories as $subcategory)
            foreach($subcategory['works'] as $work)
                foreach($work['resources'] as $resource){
                    if( substr($resource['code'],0,1) === "N" || substr($resource['code'],0,1) === "M")
                    {
                        unset($resource['id']);
                        unset($resource['pivot']);
                        $labourMachine[] = $resource;
                    }
                    if( substr($resource['code'],0,1) === "V" )
                    {
                        unset($resource['id']);
                        unset($resource['pivot']);
                        $material[] = $resource;
                    }
                }
        array_push( $prices, $labourMachine, $material);
        
        return $prices;
        // return an array with 2 arrays: labour-machine resources, material resources
    }

    private function summaryTableData( $constructionID, $categoryID )
    {
        $resources = $this->costTableData($constructionID, $categoryID);
        
        $labourCost = 0;
        $machineCost = 0;
        $materialCost = 0;
        $cost = [];

        foreach($resources[0] as $labourResource)
            $labourCost += $labourResource['price'];
        foreach($resources[1] as $machineResource)
            $machineCost += $machineResource['price'];
        foreach($resources[2] as $materialResource)
            $materialCost += $materialResource['price'];
        
        array_push( $cost, $labourCost, $machineCost, $materialCost);
        return $cost;
        // return an array with 3 elements: labour cost, material cost, machine cost
    }

    public function getSummarySheetData( $constructionID, $categoryID )
    {
        $data = $this->summaryTableData( $constructionID, $categoryID );
        return [
            [ "BẢNG TỔNG HỢP CHI PHÍ XÂY LẮP" ],
            [ " " ],
            [ "CÔNG TRÌNH: " ],
            [ "HẠNG MỤC: " ],
            [ "ĐỊA ĐIỂM: " ],
            [ " " ],
            [ "TT", "Hạng mục chi phí", "Ký hiệu", "Hệ số", "Cách tính", "Thành tiền" ],
            [ "1", "Chi phí vật liệu", "VL", "1.000", "VL", "=" . $data[1] ],
            [ "2", "Chi phí nhân công", "NC", "5.333", "NC x HS", "=" . $data[0] . "*D9" ],
            [ "3", "Chí phí máy thi công", "M", "1.500", "M x HS", "=" . $data[2] . "*D10" ],
            [ "4", "Chí phí trực tiếp khác", "TT", "0.025", "(VL + NC + M) x HS", "=SUM(F8:F10)*D11" ],
            [ " ", "- Chí phí trực tiếp", "T", "1.000", "VL + NC + M + TT", "=SUM(F8:F11)*D12" ],
            [ " ", "- Chí phí chung", "C", "0.065", "T x HS", "=F12*D13" ],
            [ " ", "- Thu nhập chịu thuế tính trước", "L", "0.055", "(T + C) x HS", "=SUM(F12:F13)*D14" ],
            [ " ", "- Chi phí xây dựng trước thuế", "G", "1.000", "T + C + L", "=SUM(F12:F14)" ],
            [ " ", "- Thuế giá trị gia tăng", "VAT", "0.1", "G * HS", "=F14*D16" ],
            [ " ", "- Chi phí xây dựng sau thuế", "Gxd", "1.000", "G+VAT", "=SUM(F15:F16)" ],
            [ " ", "- Chi phí xây dựng nhà tạm, nhà điều hành", " ", "Gxdnt", "G*1%+(1+10%)", "=F17*1/100+(1+1/100)" ],
            [ "*.", "- Tổng cộng", "Gxdtc", "1.000", "Gxd+Gxdnt", "=SUM(F17:F18)" ],
        ];
    }

    // return values with Google Spreadsheet Format
    public function getEstimateSheetData( $constructionID, $categoryID )
    {
        $data = $this->estimateTableData( $constructionID, $categoryID );

        $values = [
            [ "BẢNG DỰ TOÁN CHI TIẾT" ],
            [ " " ],
            [ "CÔNG TRÌNH: " ],
            [ "HẠNG MỤC: " ],
            [ "ĐỊA ĐIỂM: " ],
            [ " " ],
            ['TT', 'Mã', 'Hạng mục/Công tác', 'Đơn vị', 'Số lượng', 'Dài', 
            'Rộng', 'Cao', 'Khối lượng', 'Đơn giá', 'Thành tiền']
        ];

        $stt = 1;
        for ( $i = 0; $i < sizeof( $data ); $i++ ) {
            $tmpArr = [];
            // Column A: if unit exists, push STT, else, push null character
            if ( isset( $data[$i]["code"] ) ) {
                array_push( $tmpArr, $stt );
                $stt++;
            } else {
                array_push( $tmpArr, '' );
            }

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
        //echo '<pre>', var_export($values, true), '</pre>', "\n";
        return $values;
    }

    public function get2CostSheetData( $constructionID, $categoryID ) {
        $data = $this->costTableData( $constructionID, $categoryID );
        $labourMachine = [
            [ "BẢNG GIÁ NHÂN CÔNG VÀ CA MÁY" ],
            [ " " ],
            [ "CÔNG TRÌNH: " ],
            [ "HẠNG MỤC: " ],
            [ "ĐỊA ĐIỂM: " ],
            [ " " ],
            [ "TT", "Nhân công và máy thi công", "Đơn vị", "Đơn giá" ]
        ];
        for ( $i=0; $i < sizeof( $data[3] ); $i++ ) {
            $row = [];
            array_push( $row, ($i + 1), $data[3][$i]["name"], $data[3][$i]["unit"], $data[3][$i]["price"] );
            array_push( $labourMachine, $row );
        }

        $material = [
            [ "BẢNG GIÁ VẬT LIỆU" ],
            [ " " ],
            [ "CÔNG TRÌNH: " ],
            [ "HẠNG MỤC: " ],
            [ "ĐỊA ĐIỂM: " ],
            [ " " ],
            [ "TT", "Tên vật liệu", "Đơn vị", "Đơn giá" ]
        ];

        for ( $i=0; $i < sizeof( $data[2] ); $i++ ) {
            $row = [];
            array_push( $row, ($i + 1), $data[2][$i]["name"], $data[2][$i]["unit"], $data[2][$i]["price"] );
            array_push( $material, $row );
        }

        return [
          "labourMachine"   => $labourMachine,
          "material"        => $material
        ];

        //echo '<pre>', var_export($labourMachine, true), '</pre>', "\n";
        //echo '<pre>', var_export($material, true), '</pre>', "\n";
    }
}