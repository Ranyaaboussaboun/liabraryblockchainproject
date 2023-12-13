const LibraryAccessControl = artifacts.require("LibraryAccessControl");

module.exports = function(deployer) {
  deployer.deploy(LibraryAccessControl);
};
