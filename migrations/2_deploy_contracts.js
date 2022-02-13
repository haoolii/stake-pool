const Hao = artifacts.require("Hao");
const Pool = artifacts.require("Pool");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Hao);
  const hao = await Hao.deployed();

  await deployer.deploy(Pool, hao.address);
};
