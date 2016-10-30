<?php
return array(
    'repositories' => array(
        'json' => array(
            'dataFolder' => ROOT . DS . 'data'
        )
    ),
    'logging' => array(
        'logLevel' => "DEBUG",
        /*
         * Possible levels, in decreasing priority are:
         * EMERGENCY
         * ALERT
         * CRITICAL
         * ERROR
         * WARNING
         * NOTICE
         * INFO
         * DEBUG
         * For more info, see https://github.com/katzgrau/KLogger
         */
        'logFormat' => '[{date}]   [{level}]   {message}',
        'logDirectory' => ROOT . DS . 'logs' . DS,
        'defaultTimeZone' => 'America/Chicago'
        /* 
         * See https://github.com/katzgrau/KLogger for details on configuration.
         */
        
    ),
    'devMode' => true
    
);

