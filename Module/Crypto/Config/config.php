<?php

return [
    'ACTIVE_EXCHANGE_GATEWAY' => 'Binance',
    'ACTIVE_FIAT_TO_CRYPTO_GATEWAY' => 'Strip',

    'Binance' => [
        'API_KEY' => '',
        'BASE_URL' => 'https://api-sandbox.coingate.com/v2/',
        'SUCCESS_URL' => "https://marketplace2-dev.jewelprotech.com/api/v1/crypto/callback?isCrypto=true&isComplate=true",
        'CANCEL_URL' => "https://marketplace2-dev.jewelprotech.com/api/v1/crypto/callback?isCrypto=true&isComplate=false",
        'CALLBACK_URL' => "https://marketplace2-dev.jewelprotech.com/api/v1/crypto/callback?isCrypto=true",
        'RECEIVE_CURRENCY' => 'USDT',
    ],

    'Strip' => [
        'API_KEY' => '',
        'BASE_URL' => 'https://api-sandbox.coingate.com/v2/',
        'SUCCESS_URL' => "https://marketplace2-dev.jewelprotech.com/api/v1/crypto/callback?isCrypto=true&isComplate=true",
        'CANCEL_URL' => "https://marketplace2-dev.jewelprotech.com/api/v1/crypto/callback?isCrypto=true&isComplate=false",
        'CALLBACK_URL' => "https://marketplace2-dev.jewelprotech.com/api/v1/crypto/callback?isCrypto=true",
        'RECEIVE_CURRENCY' => 'USDT',
    ]

];
