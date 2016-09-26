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

use Exception;
use QM\ConfigManager\ConfigManager;
use QM\Logging\KLoggerWrapper;
use QM\RequestRouter\RequestData;
use QM\RequestRouter\RequestDataFactory;
use QM\RequestRouter\RequestRouter;

/**
 * This is the highest level class that controls the operation of this application.
 *
 * @author jtfalkenstein
 */
class Application {
    private $log;
    private $configManager;
    public function __construct() {
        $this->configManager = new ConfigManager();
        $this->log = new KLoggerWrapper($this->configManager);
    }
    
    public function Run(){
       $this->logRequest();
       try{
            // 1. Get request factory
            $fac = new RequestDataFactory();
            // // 2. Get the request data from the factory
            $data = $fac->Package();
            $this->log->debug("Request data:", (array)$data);
            // 3. Get the router
           $router = new RequestRouter($this);
           // 4. Route based upon the data
           $router->Route($data);
       } catch (Exception $ex) {
           $this->log->logException($ex);
           //TODO: institute some kind of global exception handler
       }
    }
    
    private function logRequest()
    {
        $this->log->info("New Request from {$_SERVER['REMOTE_ADDR']}");
        $this->log->debug(
                "Request Info:", 
                array(
                    'Request Method' => $_SERVER['REQUEST_METHOD'],
                    'User Agent' => $_SERVER['HTTP_USER_AGENT'],
                    'Query String' => $_SERVER['QUERY_STRING']
                ));
    }
    
    public function GetHomePage(RequestData $data){
        $this->log->info("Requested Home page");
        
    }
    
    
    public function GetQuizData(RequestData $data)
    {
        
    }
    
    public function CreateQuiz(RequestData $data)
    {
        
    }
    
    public function DeleteQuiz(RequestData $data)
    {
        
    }
    
    public function UpdateQuiz(RequestData $data)
    {
        
    }
    
    public function ReorderQuiz(RequestData $data)
    {
        
    }
    
    public function CloneQuiz(RequestData $data)
    {
        
    }
    
    public function GetQuizList(RequestData $data)
    {
        
    }
    
    public function CreateQuestion(RequestData $data)
    {
        
    }
    
    public function UpdateQuestion(RequestData $data)
    {
        
    }
    
    public function DeleteQuestion(RequestData $data)
    {
        
    }
    
    public function CreateDepartment(RequestData $data)
    {
        
    }
    
    public function DeleteDeparment(RequestData $data)
    {
        
    }
    
    public function GetDepartmentList(RequestData $data)
    {
        
    }
    
    

    

}
