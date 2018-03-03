pragma solidity ^0.4.17;

contract Signup {
	
	// Struct of user data
	struct User {
		bytes32 id;
		bytes32 name;
		bytes32 email;
	}

	// mapping User Struct to users
	mapping (address => User) users;

	// store all user addresses
	address[] public userAccounts;

	// set User details
	function setUser(bytes32 name, bytes32 email) public {
		
		// Get current address of user
		User storage user_ = users[msg.sender];

		user_.id = keccak256(msg.sender);
		user_.name = name;
		user_.email = email;

		// store address
		userAccounts.push(msg.sender);
	}

	// get User details
	function getUser() view public returns (bytes32, bytes32, bytes32) {

		// Get current address of user
		User memory user_ = users[msg.sender];

		return (user_.id, user_.name, user_.email);
	}
	
	// share user details with app or service
	// to further mask unique id, SHA3 user ID with URL
	function allowSignin(string url, bool isName, bool isEmail) view public returns (bytes32, bytes32, bytes32) {

		// Get current address of user
		User memory user_ = users[msg.sender];

		user_.id = keccak256(user_.id, url);
	
		if(isName != true)
			user_.name = "";

		if(isEmail != true)
			user_.email = "";

		return (user_.id, user_.name, user_.email);
	}

	// get User details by passing address
	function getUser_(address userAddress) view public returns (bytes32, bytes32, bytes32) {

		// Get current address of user
		User memory user_ = users[userAddress];

		return (user_.id, user_.name, user_.email);
	}

}