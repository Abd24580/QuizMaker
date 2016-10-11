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
use QM\Logging\KLoggerWrapper;
use QM\Quiz\Question;
use QM\Quiz\QuestionFactory;
use QM\Quiz\Quiz;

/**
 * The central repository for quizzes and questions.
 *
 * @author jfalkenstein
 */
class QuizRepo {
    private $config;
    private $qFac;
    private $deptsRepo;
    private $log;
    public function __construct(ConfigManager $config, QuestionFactory $factory, DeptRepo $depts, KLoggerWrapper $log) {
        $this->config = $config->GetValue(array('repositories', 'json'));
        $this->qFac = $factory;
        $this->deptsRepo = $depts;
        $this->log = $log;
    }
    
    public function GetQuiz($departmentId, $quizId, $rawJson = false){
        $quizPath = $this->getQuizPath($departmentId, $quizId);
        $json = $this->getJsonObject($quizPath, $rawJson);
        if($rawJson){
            return $json;
        }
        $quiz = new Quiz($json['Id']);
        $quiz->DepartmentId = $json['DepartmentId'];
        $quiz->Name = $json['Name'];
        $quiz->QuestionOrders = $json['QuestionOrders'];
        foreach($json['QuestionsArray'] as $key => $val){
            $q = $this->qFac->GetPreExisting(
                    $val['Id'], 
                    $val['DepartmentId'],
                    $val['QuizId'],
                    $val['QuestionText'],
                    $val['AnswersArray'],
                    $val['CorrectIndex'],
                    $val['IncorrectMessage']);
            $quiz->SaveQuestion($q);
        }
        $this->log->info("Obtained Quiz ($quiz->Name) from $quizPath.");
        return $quiz;
        
    }
    
    public function StoreQuiz(Quiz $quiz){
        if($this->QuizExists($quiz->DepartmentId, $quiz->Id)){
            $oldQuiz = $this->GetQuiz($quiz->DepartmentId, $quiz->Id);
            $quiz->QuestionsArray = $oldQuiz->QuestionsArray;
            $quiz->QuestionOrders = $oldQuiz;
        }
        $this->storeToJson($quiz);
        $this->deptsRepo->AddQuizToDepartment($quiz);
        return $quiz;
    }
    
    private function QuizExists($departmentId, $quizId){
        $depts = $this->deptsRepo->GetDepartments();
        $dept = $depts[$departmentId];
        if(is_null($dept)){
            return false;
        }
        /* @var $dept \QM\Quiz\Department */
        $quiz = $dept->Quizzes->$quizId;
        return isset($quiz);
    }
    
    public function DeleteQuiz($departmentId, $quizId){
        $quizPath = $this->getQuizPath($departmentId, $quizId);
        $this->log->notice("Deleting Quiz at $quizPath");
        unlink($quizPath);
        $this->deptsRepo->DeleteQuizFromDepartment($departmentId, $quizId);
    }
    
    public function AddQuestionToQuiz(Question $question){
        $this->log->info("Adding Question:",(array)$question);
        $quiz = $this->GetQuiz($question->DepartmentId, $question->QuizId);
        $quiz->SaveQuestion($question);
        $this->storeToJson($quiz);
        return $quiz;
    }
    
    public function GetQuestion($departmentId, $quizId, $questionId){
        $quiz = $this->GetQuiz($departmentId, $quizId);
        $q = $quiz->QuestionsArray[$questionId];
        return $q;
    }
    
    public function DeleteQuestion($departmentId, $quizId, $questionId){
        $quiz = $this->GetQuiz($departmentId, $quizId);
        $this->log->info("Deleting question: ", (array)$quiz->QuestionsArray[$questionId]);
        $quiz->DeleteQuestion($questionId);
        $this->storeToJson($quiz);
        return $quiz;
    }
    
    private function getQuizPath($departmentId, $quizId){
        $pathToQuiz = $this->getQuizFolder($departmentId) . DS . $quizId. ".json";
        return $pathToQuiz;
    }
    
    private function getQuizFolder($departmentId){
        $dataFolder = $this->config['dataFolder'];
        $pathToQuiz = $dataFolder . DS . $departmentId;
        return $pathToQuiz;
    }
    
    private function getJsonObject($filePath, $rawJson = false){
        if(!file_exists($filePath)){
            return null;
        }
        $str = file_get_contents($filePath);
        if($rawJson){
            return $str;
        }
        return json_decode($str, true);
    }
    
    private function storeToJson(Quiz $quiz){
        $quizPath = $this->getQuizPath($quiz->DepartmentId, $quiz->Id);
        $quizFolder = $this->getQuizFolder($quiz->DepartmentId);
        $this->log->info("Storing quiz $quiz->Name to $quizPath.");
        $json = json_encode($quiz, JSON_PRETTY_PRINT);
        if(!file_exists($quizFolder)){
            mkdir($quizFolder, 0777, true);
        }
        file_put_contents($quizPath, $json, LOCK_EX);
    }
}
