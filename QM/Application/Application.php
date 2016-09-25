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

namespace QM\Application;

use DI\Container;

/**
 * This is the highest level class that controls the operation of this application.
 *
 * @author jtfalkenstein
 */
class Application {
    private $container;
    private $log;
    public function __construct(Container $container, \QM\Logging\ILoggingService $logger) {
        $this->container = $container;
        $this->log = $logger;
    }
    
    public function Run(){
       $this->logRequest();
       try{
           
       } catch (Exception $ex) {
           $this->log->logException($ex);
       }
    }
    
    private function logRequest()
    {
        $this->log->info(
                "New Request from {$_SERVER['REMOTE_ADDR']}",
                [
                    'Request Method' => $_SERVER['REQUEST_METHOD]'],
                    'User Agent' => $_SERVER['HTTP_USER_AGENT']
                ]);
    }

    

}
