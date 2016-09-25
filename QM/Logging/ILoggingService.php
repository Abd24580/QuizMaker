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

namespace QM\Logging;

use Psr\Log\LoggerInterface;

/**
 *
 * @author jtfalkenstein
 */
interface ILoggingService extends LoggerInterface{
    /**
     * Logs with an arbitrary level.
     *
     * @param mixed $level
     * @param string $message
     * @param array $context
     * @return null
     */
    public function log($level, $message, array $context = array());
    /**
     * Writes a line to the log without prepending a status or timestamp
     *
     * @param string $message Line to write to the log
     * @return void
     */
    public function write($message);
    /**
     * Get the last line logged to the log file
     *
     * @return string
     */
    public function getLastLogLine();
}
