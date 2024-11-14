## Hello TAC!

This is a very simple and basic example of deploying a contract to TAC EVM!

This is a foundry project and uses foundry to deploy the contract to TAC EVM. You can learn more about foundry [here](https://book.getfoundry.sh/).

### Compiling the contract

```bash
forge build
```

### Running the tests

```bash
forge test
```

### Deploying the contract

```bash
forge create --rpc-url https://newyork-inap-72-251-230-233.ankr.com:443/tac_tacd_testnet_full_rpc_1 --private-key $PRIVATE_KEY src/hello-tac.sol:HelloWorld
```
