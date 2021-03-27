var Web3 = require('web3');

// create local ganache server to connect to
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));


// let tokenAddress = "0x49184e6dae8c8ecd89d8bdc1b950c597b8167c90";
let contractAddress = "0xb7514a1d3f024acfb874516219fa6135214329f2" ;
let tokenAddress = "0xe6EbCCFa08C8F290ec02a51109f9E1A905C68476";
// let contractAddress = "0x49184e6dae8c8ecd89d8bdc1b950c597b8167c90";

// The minimum ABI to get ERC20 Token balance
let minABI = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  // decimals
  {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  }
];

// Get ERC20 Token contract instance
let contract = web3.eth.contract(minABI).at(tokenAddress);
console.log(contract)

// Call balanceOf function
contract.balanceOf(contractAddress, (error, balance) => {
  // Get decimals
  contract.decimals((error, decimals) => {
    // calculate a balance
    balance = balance.div(10**decimals);
    return(balance.toString());
  });
});
