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

use Katzgrau\KLogger\Logger;
use Psr\Log\AbstractLogger;
use QM\ConfigManager\ConfigManager;

/**
 * Description of KLoggerWrapper
 *
 * @author jtfalkenstein
 */
class KLoggerWrapper extends AbstractLogger {
    
    private $klogger;
    public function __construct(ConfigManager $config) {
        $c = $config->GetValue('logging');
        $timeZone = $c['defaultTimeZone'];
        date_default_timezone_set($timeZone);
        $this->klogger = new Logger(
                $c['logDirectory'],
                constant('\Psr\Log\LogLevel::'. strtoupper($c['logLevel'])), 
                array(
                    'logFormat' => $c['logFormat']
                ));
    }

    public function getLastLogLine() {
        return $this->klogger->getLastLogLine();
    }

    public function log($level, $message, array $context = array()) {
        $this->klogger->log($level, $message, $context);
    }

    public function write($message) {
        $this->klogger->write($message);
    }

    public function logException(\Exception $ex) {
        $this->error("Exception: " . get_class($ex) ." {$ex->getMessage()}", array(
            'File of exception' => $ex->getFile(),
            'Line #' => $ex->getLine(),
            'Stack trace' => $ex->getTrace()
            
        ));
    }

}
