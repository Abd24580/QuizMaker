<?php

/*
 * Copyright (C) 2016 jfalkenstein
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

namespace Responses;

use Exception;
use QM\ConfigManager\ConfigManager;
use stdClass;

/**
 * Packages output and puts it into a standardized format, within js.
 *
 * @author jfalkenstein
 */
class JsonPackager {
    private $devMode;
    public function __construct(ConfigManager $config) {
        $this->devMode = $config->GetValue('devMode');
    }
    
    public function SendException(Exception $ex){
        $e;
        if($this->devMode){
            $e = new stdClass();
            $e->message = $ex->getMessage();
            $e->file = $ex->getFile();
            $e->line = $ex->getLine();
            $e->trace = $ex->getTraceAsString();
        }else{
            $e = "An error was encountered in processing your request.";
        }
        $this->output($this->toJson('exception', $e));
    }
    
    public function SendData($data, $status = "success"){
        $this->output($this->toJson($status, $data));
    }
    
    private function toJson($status, $data){
        $array = array(
            'status' => $status,
            'data' => $data
        );
        
        return json_encode($array,JSON_PRETTY_PRINT);
    }
    
    private function output($json){
        header("Content-Type: application/json");
        echo $json;
    }
}
