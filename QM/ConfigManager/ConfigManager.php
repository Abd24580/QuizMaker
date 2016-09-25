<?php

/*
 * Copyright (C) 2016 jtfalkenstein
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

namespace QM\ConfigManager;

/**
 * Provides centralized access to application's configurations.
 *
 * @author jtfalkenstein
 */
class ConfigManager {
    private $config;
    
    public function __construct() {
        $this->config = include ROOT.DS.'config'.DS.'config.php';
    }
    /**
     * Gets a value (or array of values) from the application's configurations.
     * Each successive value in the one-dimensional $key (if it is an array) will
     * go one level deeper. For example: ['repositories','json','testsPath'] would
     * be the equivalent of searching for $config['repositories']['json']['testsPath'].
     * @param array|string $key
     * @return type
     */
    public function GetValue($key){
        $value = $this->configArray;
        if(is_array($key)){
            foreach($key as $subKey){
                $value = $value[$subKey];
            }
        }else{
            $value = $this->configArray[$key];
        }
        return $value;        
    }
    
    /**
     * Merges in an array (however deep) of configurations into the config array
     * when called.
     * @param array $configArray
     */
    public function addConfigs(array $configArray) {
        $this->configArray = array_merge_recursive($this->configArray, $configArray);
    }
    
}
