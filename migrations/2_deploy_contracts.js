const Hao = artifacts.require("Hao");
const Pool = artifacts.require("Pool");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Hao, web3.utils.toWei(`${60000000}`, "ether"));
  const hao = await Hao.deployed();
  await deployer.deploy(Pool, hao.address);
  const pool = await Pool.deployed();
  await hao.transfer(pool.address, web3.utils.toWei(`${5000}`, "ether"));
};
