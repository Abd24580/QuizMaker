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

namespace QM\Quiz;

/**
 * Description of Quiz
 *
 * @author jtfalkenstein
 */
class Quiz {
    public $Id;
    public $Name;
    public $DepartmentId;
    public $QuestionsArray;
    public $QuestionOrders;
    
    public function __construct($id = null) {
        if(is_null($id)){
            $id = uniqid('quiz');
        }
        $this->Id = $id;
        $this->QuestionsArray = array();
        $this->QuestionOrders = array();
    }
    
    public function SaveQuestion(Question $question){
        $position = array_search($question->Id, $this->QuestionOrders);
        if($position === false){
            $max = max(array_keys($this->QuestionOrders));
            $position = $max === false ? 0 : $max + 1;
        }
        $this->QuestionsArray[$question->Id] = $question;
        $this->QuestionOrders[$position] = $question->Id;
    }
    
    public function DeleteQuestion($id){
        unset($this->QuestionsArray[$id]);
        $key = array_search($id, $this->QuestionOrders);
        unset($this->QuestionOrders[$key]);
    }
}
