var Signup = artifacts.require("Signup");
var SSO = artifacts.require("sso");

module.exports = function(deployer) {
	deployer.deploy(Signup);
	// deployer.deploy(SSO);
}
