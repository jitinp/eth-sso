pragma solidity ^0.4.17;

contract Signup {
	
	// Struct of user data
	struct User {
		string id;
		string name;
		string email;
	}

	// mapping User Struct to users
	mapping (address => User) users;

	// store all user addresses
	address[] public userAccounts;

	// set User details
	function setUser(string id, string name, string email) public {
		
		// Get current address of user
		var user_ = users[msg.sender];

		user_.id = id;
		user_.name = name;
		user_.email = email;

		// store address
		userAccounts.push(msg.sender);
	}

	// get User details
	function getUser() view public returns (string, string, string) {

		// Get current address of user
		var user_ = users[msg.sender];

		return (user_.id, user_.name, user_.email);
	}

}