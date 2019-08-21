var MemorySaver = artifacts.require("./MemorySaver.sol");

module.exports = function(deployer) {
  deployer.deploy(MemorySaver);
};
