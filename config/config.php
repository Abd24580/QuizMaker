<?php
$dataPath = ROOT . DS . 'data' . DS;
return [
    'repositories' => [
        'json' => [
            'questionsPath' =>  "{$dataPath}questions.json",
            'testsPath' => "{$dataPath}tests.json",
            'departments' => "{$dataPath}departments.json"
        ]
    ],
    'logging' => [
        'logLevel' => "DEBUG",
        /*
         * Possible levels, in decreasing priority are:
         * EMERGENCY;
         * ALERT;
         * CRITICAL;
         * ERROR;
         * WARNING;
         * NOTICE;
         * INFO;
         * DEBUG;
         * For more info, see https://github.com/katzgrau/KLogger
         */
        'logFormat' => '[{date}]\t[{level}]\t{message}',
        'logDirectory' => ROOT . DS . 'logs' . DS
        /* 
         * See https://github.com/katzgrau/KLogger for details on configuration.
         */
        
    ]
    
];

