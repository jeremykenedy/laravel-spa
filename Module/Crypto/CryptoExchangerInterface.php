<?php

namespace Module\Crypto;

interface CryptoExchangerInterface
{
    public function getAllCoinsInformation();

    public function getDepositHistory(array $payload = []);

    public function getWithdrawHistory(array $payload = []);

    public function getDepositAddress(array $payload = []);

    public function getWalletCoins(array $payload = []);

    public function createWithdrawRequest(array $payload = []);

    public function getUserOrders(array $params = []);

    public function createNewOrder(array $params = []);

    public function cancelOrder(array $params = []);

    public function getAllSymbols();

    public function getSymbol(string $symbol);

    public function getAverageSymbol(string $symbol);

    public function getRecentTradeList(string $symbol);
}
