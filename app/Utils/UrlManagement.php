<?php

namespace App\Utils;

class UrlManagement {
	public static function getBaseUrl() {
		$baseURL = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
		if ( $_ENV["IS_LOCAL"] ) {
			return $baseURL . "/HMS/public/";
		}
		return $baseURL . "/public/";
	}
}