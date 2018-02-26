pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Signup.sol";

contract TestSignup {
	
	// Signup signup = Signup(DeployedAddresses.Signup());

	// // Testing the setUser function
	// function beforeEach() public {
	// 	signup.setUser("Jitin Pillai", "jitin2pillai@gmail.com");
	// }

	// // Testing whether the passed name is Correct
	// function testUserCanGetCorrectName() public {
	// 	address expected = this;

	// 	var (id, name, email) = signup.getUser_(expected);

	// 	Assert.equal(name, "Jitin Pillai", "Name as Jitin Pillai should be recorded");	
	// }

	// // Testing whether the passed name is Correct
	// function testUserCanGetCorrectEmail() public {
	// 	address expected = this;

	// 	var (id, name, email) = signup.getUser_(expected);

	// 	Assert.equal(email, "jitin2pillai@gmail.com", "Email as jitin2pillai@gmail.com should be recorded");	
	// }
}		