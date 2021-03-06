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

/**
 * Description of RequestDataFactory
 *
 * @author jtfalkenstein
 */
class RequestDataFactory {
    public function Package(){
        $data = new RequestData();
        $data->data = $_GET;
        $data->data = array_merge_recursive($data->data,$_POST);
        $data->action = $data->data['ACTION'];
        $data->subject = $data->data['SUBJECT'];
        $data->format = $data->data['FORMAT']; 
        $data->requestMethod = $_SERVER['REQUEST_METHOD'];
        return $data;
    }
}
