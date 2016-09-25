<?php
return [
    'repositories' => [
        'json' => [
            'dataFolder' => ROOT . DS . 'data'
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
        'logFormat' => '[{date}]   [{level}]   {message}',
        'logDirectory' => ROOT . DS . 'logs' . DS
        /* 
         * See https://github.com/katzgrau/KLogger for details on configuration.
         */
        
    ]
    
];

