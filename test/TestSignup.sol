pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Signup.sol";

contract TestSignup {
	
	Signup signup = Signup(DeployedAddresses.Signup());

	// Testing the setUser function
	function testUserCanSignup() public {
		signup.setUser("7", "Jitin Pillai", "jitin2pillai@gmail.com");
	}

	// Testing the getUser function
	function testUserCanGetResults() public {
		address expected = this;

		var userId;
		var name;
		var email;

		(userId, name, email) = signup.getUser();

		Assert.equal(userId, "7", "Id as 7 should be recorded");
	}

}