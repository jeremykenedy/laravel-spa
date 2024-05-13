<?php


namespace Corals\Modules\Payment\Crypto;

use Module\Crypto\CryptoExchangerInterface;

class BinanceExchanger implements CryptoExchangerInterface
{

    public function getAllCoinsInformation()
    {
        // TODO: Implement getAllCoinsInformation() method.
    }

    public function getDepositHistory(array $payload = [])
    {
        // TODO: Implement getDepositHistory() method.
    }

    public function getWithdrawHistory(array $payload = [])
    {
        // TODO: Implement getWithdrawHistory() method.
    }

    public function getDepositAddress(array $payload = [])
    {
        // TODO: Implement getDepositAddress() method.
    }

    public function getWalletCoins(array $payload = [])
    {
        // TODO: Implement getWalletCoins() method.
    }

    public function createWithdrawRequest(array $payload = [])
    {
        // TODO: Implement createWithdrawRequest() method.
    }

    public function getUserOrders(array $params = [])
    {
        // TODO: Implement getUserOrders() method.
    }

    public function createNewOrder(array $params = [])
    {
        // TODO: Implement createNewOrder() method.
    }

    public function cancelOrder(array $params = [])
    {
        // TODO: Implement cancelOrder() method.
    }

    public function getAllSymbols()
    {
        // TODO: Implement getAllSymbols() method.
    }

    public function getSymbol(string $symbol)
    {
        // TODO: Implement getSymbol() method.
    }

    public function getAverageSymbol(string $symbol)
    {
        // TODO: Implement getAverageSymbol() method.
    }

    public function getRecentTradeList(string $symbol)
    {
        // TODO: Implement getRecentTradeList() method.
    }
}
