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

namespace QM\RequestRouter;

use QM\Application\Application;

/**
 * Gets request information from the superglobals and directs application
 * activity based upon the request.
 *
 * @author jtfalkenstein
 */
class RequestRouter {
    
    private $app;
    
    public function __construct(Application $app) {
        $this->app = $app;
    }
    
    public function Route(RequestData $data){
        //If no subject is specified, get the home page.
        if(is_null($data->subject)){
            $this->app->GetHomePage($data);
        }
        
        switch (strtolower($data->subject)) {
            case 'quiz':
                $this->routeQuiz($data);
                break;
            case 'department':
                $this->routeDepartment($data);
                break;
            case 'departmentlist':
                $this->routeDepartmentList($data);
                break;
            case 'question':
                $this->routeQuestion($data);
                break;
        }
    }
    
    
    private function routeQuiz(RequestData $data){
        if($data->requestMethod == "GET" && is_null($data->action)){
            $this->app->GetQuiz($data);
            return;
        }
        switch(strtolower($data->action)){
            case 'create':
                $this->app->CreateQuiz($data);
                break;
            case 'clone':
                $this->app->CloneQuiz($data);
                break;
            case 'delete':
                $this->app->DeleteQuiz($data);
                break;
            case 'reorder':
                $this->app->ReorderQuiz($data);
                break;
            case 'update':
                $this->app->UpdateQuiz($data);
        }
    }
    
    private function routeDepartment(RequestData $data){
        switch (strtolower($data->action)){
            case 'create':
                $this->app->CreateDepartment($data);
                break;
            case 'delete':
                $this->app->DeleteDepartment($data);
                break;
            case 'update':
                $this->app->UpdateDepartment($data);
                break;      
        }
    }
    
    private function routeDepartmentList(RequestData $data){
        $this->app->GetDepartmentList($data);
    }
    
    private function routeQuestion(RequestData $data){
        switch (strtolower($data->action)){
            case 'create':
                $this->app->CreateQuestion($data);
                break;
            case 'update':
                $this->app->UpdateQuestion($data);
                break;
            case 'delete':
                $this->app->DeleteQuestion($data);
                break;
        }
    }
}
