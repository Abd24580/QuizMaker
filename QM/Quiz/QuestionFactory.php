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
 * Description of QuestionFactory
 *
 * @author jtfalkenstein
 */
class QuestionFactory {
    public function CreateNew($deptId, $quizId, $questionText, array $answers, $correctIndex, $incorrectMessage = "")
    {
        $id = uniqid("question");
        return $this->GetPreExisting($id, $deptId, $quizId, $questionText, $answers, $correctIndex, $incorrectMessage);
    }
    
    public function GetPreExisting($id, $deptId, $quizId, $questionText, array $answers, $correctIndex, $incorrectMessage = "")
    {
        $q = new Question();
        $q->Id = $id;
        $q->DepartmentId = $deptId;
        $q->QuizId = $quizId;
        $q->QuestionText = $questionText;
        $q->AnswersArray = $answers;
        $q->IncorrectMessage = $incorrectMessage;
        return $q;
    }
            
}
