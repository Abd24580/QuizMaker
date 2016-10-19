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
use QM\Responses\JsonPackager;

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
    private $jsonPackager;
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
        $this->jsonPackager = new JsonPackager($this->configManager);
    }
    
    public function Run(){
       $this->logRequest();
       $data;
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
           if(isset($data)){
               if($data->format === "json"){
                   $this->jsonPackager->SendException($ex);
               }
           }
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
        include(ROOT . DS . 'tmpl' . DS . 'homepage.php');
    }
    
    public function GetQuiz(RequestData $data)
    {
        $quizId = $data->data['Id'];
        $departmentId = $data->data['DepartmentId'];
        $quiz = $this->quizRepo->GetQuiz($departmentId, $quizId);
        if(is_null($quiz)){
            $this->jsonPackager->SendData("No quiz was found with the id of $quizId", 'failure');
            return;
        }
        $this->jsonPackager->SendData($quiz);
    }
    
    public function CreateQuiz(RequestData $data)
    {
        $quiz = new Quiz();
        $quiz->DepartmentId=$data->data['DepartmentId'];
        $quiz->Name = $data->data['Name'];
        $this->quizRepo->StoreQuiz($quiz);
        $this->jsonPackager->SendData($quiz, "success");
    }
    
    public function DeleteQuiz(RequestData $data)
    {
        $id = $data->data['Id'];
        $dept = $data->data['DepartmentId'];
        $depts = $this->quizRepo->DeleteQuiz($dept, $id);
        $this->jsonPackager->SendData($depts);
    }
    
    public function UpdateQuiz(RequestData $data)
    {
        $quiz = new Quiz($data->data['Id']);
        $quiz->Name = $data->data['Name'];
        $quiz->DepartmentId = $data->data['DepartmentId'];
        $quiz->QuestionOrder = $data->data['QuestionOrder'];
        $loadedQuiz = $this->quizRepo->StoreQuiz($quiz);
        $this->jsonPackager->SendData($loadedQuiz);
    }
    
    public function ReorderQuiz(RequestData $data)
    {
        $quiz = $this->quizRepo->GetQuiz($data->data['DepartmentId'], $data->data['Id']);
        $order = $data->data['NEWORDER'];
        foreach($order as $i => $id){
            $quiz->QuestionOrder[$i] = $id;
        }
        $newQuiz = $this->quizRepo->StoreQuiz($quiz);
        $this->jsonPackager->SendData($newQuiz);
    }
    
    public function CloneQuiz(RequestData $data)
    {
        $deptId = $data->data['DepartmentId'];
        $quizId = $data->data['Id'];
        $quiz = $this->quizRepo->GetQuiz($deptId, $quizId);
        $newName = isset($data->data['Name']) ? $data->data['Name'] : $quiz->Name;
        $newDept = $data->data['NewDepartmentId'];
        $newQuiz = new Quiz();
        foreach($quiz as $prop => $val){
            if($prop === "Id"){
                continue;
            }
            $newQuiz->$prop = $val;
        }
        $this->applyNewAttributesToClone($newQuiz, $newName, $deptId);
        $quizToSend =  $this->quizRepo->StoreQuiz($newQuiz);
        $this->jsonPackager->SendData($quizToSend);
    }
    
    private function applyNewAttributesToClone(Quiz $quiz, $newName, $newDeptId){
        $quiz->Name = $newName;
        $quiz->DepartmentId = $newDeptId;
        $newArray = array();
        $newOrder = array();
        
        foreach($quiz->QuestionOrder as $index => $id){
            /* @var $question \QM\Quiz\Question */
            $question = $quiz->QuestionsArray[$id];
            $newQues = $this->questionFactory->CreateNew(
                    $newDeptId, 
                    $quiz->Id, 
                    $question->QuestionText, 
                    $question->AnswersArray, 
                    $question->CorrectIndex, 
                    $question->IncorrectMessage
            );
            $newArray[$newQues->Id] = $newQues;
            $newOrder[] = $newQues;
        }
        $quiz->QuestionsArray = $newArray;
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
        $newQuiz = $this->quizRepo->AddQuestionToQuiz($q);
        $this->jsonPackager->SendData($newQuiz);
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
        $newQuiz = $this->quizRepo->AddQuestionToQuiz($q);
        $this->jsonPackager->SendData($newQuiz);
    }
    
    public function DeleteQuestion(RequestData $data)
    {
        $d = $data->data;
        $newQuiz = $this->quizRepo->DeleteQuestion(
                $d['DepartmentId'], 
                $d['QuizId'],
                $d['Id']);
        $this->jsonPackager->SendData($newQuiz);
    }
    
    public function CreateDepartment(RequestData $data)
    {
        $dept = new Department();
        $dept->Name = $data->data['Name'];
        $depts = $this->departmentsRepo->StoreDepartment($dept);
        $this->jsonPackager->SendData($depts);
    }
    
    public function DeleteDepartment(RequestData $data)
    {
        $id = $data->data['Id'];
        $depts = $this->departmentsRepo->GetDepartments();
        $dept = $depts[$id];
        foreach($dept->Quizzes as $quizId => $name){
            $this->quizRepo->DeleteQuiz($id, $quizId);
        }
        $this->departmentsRepo->DeleteDepartment($id);
        $depts = $this->departmentsRepo->GetDepartments();
        $this->jsonPackager->SendData($depts);
    }
    
    public function UpdateDepartment(RequestData $data)
    {
        $dept = new Department($data->data['Id']);
        $dept->Name = $data->data['Name'];
        $depts = $this->departmentsRepo->StoreDepartment($dept);
        $this->jsonPackager->SendData($depts);
    }
    
    public function GetDepartmentList(RequestData $data)
    {
        $departments = $this->departmentsRepo->GetDepartments();
        $this->jsonPackager->SendData($departments);
    }
}
