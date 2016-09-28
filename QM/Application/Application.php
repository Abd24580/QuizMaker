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
use QM\Quiz\Department;
use QM\Quiz\Question;
use QM\Quiz\QuestionFactory;
use QM\Quiz\Quiz;
use QM\Repositories\DeptRepo;
use QM\Repositories\QuizRepo;
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
    private $departmentsRepo;
    private $quizRepo;
    private $questionFactory;
    public function __construct() {
        $this->configManager = new ConfigManager();
        $this->log = new KLoggerWrapper($this->configManager);
        $this->departmentsRepo = new DeptRepo($this->configManager,$this->log);
        $this->questionFactory = new QuestionFactory();
        $this->quizRepo = new QuizRepo(
                $this->configManager,
                $this->questionFactory,
                $this->departmentsRepo,
                $this->log);
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
        $this->log->notice("New Request from {$_SERVER['REMOTE_ADDR']}");
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
    
    
    public function GetQuiz(RequestData $data)
    {
        $quizId = $data->data['Id'];
        $departmentId = $data->data['DepartmentId'];
        $quiz = $this->quizRepo->GetQuiz($departmentId, $quizId, true);
        if(is_null($quiz)){
            
        }
    }
    
    public function CreateQuiz(RequestData $data)
    {
        $quiz = new Quiz();
        $quiz->DepartmentId=$data->data['DepartmentId'];
        $quiz->Name = $data->data['Name'];
        $this->quizRepo->StoreQuiz($quiz);
    }
    
    public function DeleteQuiz(RequestData $data)
    {
        $id = $data->data['QUIZID'];
        $dept = $data->data['DEPARTMENTID'];
        $this->quizRepo->DeleteQuiz($dept, $id);
    }
    
    public function UpdateQuiz(RequestData $data)
    {
        $quiz = new Quiz($data->data['Id']);
        $quiz->Name = $data->data['Name'];
        $quiz->DepartmentId = $data->data['DepartmentId'];
        $loadedQuiz = $this->quizRepo->StoreQuiz($quiz);
    }
    
    public function ReorderQuiz(RequestData $data)
    {
        $quiz = $this->quizRepo->GetQuiz($data->data['DepartmentId'], $data->data['Id']);
        $order = $data->data['NEWORDER'];
        foreach($order as $i => $id){
            $quiz->QuestionOrders[$i] = $id;
        }
        $this->quizRepo->StoreQuiz($quiz);
    }
    
    public function CloneQuiz(RequestData $data)
    {
        $deptId = $data->data['DepartmentId'];
        $quizId = $data->data['Id'];
        $quiz = $this->quizRepo->GetQuiz($deptId, $quizId);
        $newQuiz = new Quiz();
        foreach($quiz as $prop => $val){
            if($prop === "Id"){
                continue;
            }
            $newQuiz->$prop = $val;
        }
        $this->quizRepo->StoreQuiz($newQuiz);
    }
    
    public function CreateQuestion(RequestData $data)
    {
        $d = $data->data;
        $q = $this->questionFactory->CreateNew(
                $d['DepartmentId'],
                $d['QuizId'],
                $d['QuestionText'],
                $d['AnswersArray'],
                $d['CorrectIndex'],
                $d['IncorrectMessage']);
        $this->quizRepo->AddQuestionToQuiz($q);
    }
    
    public function UpdateQuestion(RequestData $data)
    {
        $d = $data->data;
        $q = $this->questionFactory->GetPreExisting(
                $d['Id'], 
                $d['DepartmentId'], 
                $d['QuizId'], 
                $d['QuestionText'],
                $d['AnswersArray'],
                $d['CorrectIndex'], 
                $d['IncorrectMessage']);
        $this->quizRepo->AddQuestionToQuiz($q);
    }
    
    public function DeleteQuestion(RequestData $data)
    {
        $d = $data->data;
        $this->quizRepo->DeleteQuestion(
                $d['DepartmentId'], 
                $d['QuizId'],
                $d['Id']);
    }
    
    public function CreateDepartment(RequestData $data)
    {
        $dept = new Department();
        $dept->Name = $data->data['Name'];
        $this->departmentsRepo->StoreDepartment($dept);
    }
    
    public function DeleteDepartment(RequestData $data)
    {
        
    }
    
    public function UpdateDepartment(RequestData $data)
    {
        
    }
    
    public function GetDepartmentList(RequestData $data)
    {
        
    }
    
    

    

}
