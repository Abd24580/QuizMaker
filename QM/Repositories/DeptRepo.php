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

namespace QM\Repositories;

use QM\ConfigManager\ConfigManager;
use QM\Quiz\Department;

/**
 * The central repository for departments.
 *
 * @author jfalkenstein
 */
class DeptRepo {
    private $config;
    private $fileLocation;
    public function __construct(ConfigManager $config) {
        $this->config = $config->GetValue(array('repositories', 'json'));
        $this->fileLocation = $this->config['dataFolder'] . DS . 'departments.json';
    }
    
    public function GetDepartments(){
        $json = $this->getJson();
        $depts = array();
        foreach($json as $key => $val){
            $dep = new Department($key);
            $dep->Name = $val['Name'];
            $depts[$key] = $dep;  
        }
        return $depts;
    }
    
    public function StoreDepartment(Department $department){
        $depts = $this->GetDepartments();
        $depts[$department->Id] = $department;
        $this->storeToJson($depts);
    }
    
    public function DeleteDepartment($id){
        $depts = $this->GetDepartments();
        unset($depts[$id]);
        $this->storeToJson($depts);
    }
    
    private function getJson(){
        if(!file_exists($this->fileLocation)){
            return array();
        }
        $str = file_get_contents($this->fileLocation);
        return json_decode($str);
    }
    
    private function storeToJson($object){
        $json = json_encode($object, JSON_PRETTY_PRINT);
        if(!file_exists($this->config['dataFolder'])){
            mkdir($this->config['dataFolder']);
        }
        file_put_contents($this->fileLocation, LOCK_EX, $json);
    }
    
}
