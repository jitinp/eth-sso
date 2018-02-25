pragma solidity ^0.4.17;

import "./Signup.sol";

contract sso {
    
     // Get user data from called address
     // Pass address of Signup Contract
    function getUserData_(address signUpContractAddress) view public returns (bytes32, bytes32, bytes32) {
        
        // Get instance of Signup contract
        Signup signup =  Signup(signUpContractAddress);
        
        // Call getUser method and pass called address
        return signup.getUser_(msg.sender);
    }
}