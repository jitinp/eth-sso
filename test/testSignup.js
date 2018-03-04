var Signup = artifacts.require("./Signup.sol");

contract('Signup', function(accounts) {

    var meta;

    // Call the contract and Register with name & email
    before(function() {
        return Signup.deployed().then(function(instance) {
            meta = instance;
            console.log(accounts[0]);
            meta.setUser("Jitin Pillai", "jitin2pillai@gmail.com", {from: accounts[0]});  
        }).catch(function(e) {
            console.log(e);
        });
    });

    it("Should return name as Jitin Pillai", function() {
        return meta.getUser.call({from: accounts[0]}).then(function(userArray) {
            var name = toAscii(userArray[1]);
            assert.equal(name, "Jitin Pillai", "Name does not match");
        });
    });

    it("Should return email as jitin2pillai@gmail.com", function() {
        return meta.getUser.call({from: accounts[0]}).then(function(userArray) {
            var name = toAscii(userArray[2]);
            assert.equal(name, "jitin2pillai@gmail.com", "Email does not match");
        });
    });

    // Update info
    it("should update name & email", function() {
        return Signup.deployed().then(function(instance) {
            meta = instance;
            console.log(accounts[0]);
            meta.setUser("Johhny Lever", "johnny@fuckmail.com", {from: accounts[0]});  
        }).catch(function(e) {
            console.log(e);
        });
    });

    // Return updated name
    it("Should return name as Johhny Lever", function() {
        return meta.getUser.call({from: accounts[0]}).then(function(userArray) {
            var name = toAscii(userArray[1]);
            assert.equal(name, "Johhny Lever", "Name does not match");
        });
    });

    // return updated email
    it("Should return email as johnny@fuckmail.com", function() {
        return meta.getUser.call({from: accounts[0]}).then(function(userArray) {
            var email = toAscii(userArray[2]);
            console.log("Original Id is:: " + userArray[0]);
            assert.equal(email, "johnny@fuckmail.com", "Email does not match");
        });
    });

    // return id if URL is provided as Google.com
    it("should return email as johhny@fuckmail.com but unique ID printed should be different for Google.com", function() {
        return meta.allowSignin.call("www.google.com", true, true, {from: accounts[0]}).then(function(userArray) {
            var id = userArray[0];
            console.log("Modified Id is:: " + id);
            var email = toAscii(userArray[2]);
            assert.equal(email, "johnny@fuckmail.com", "Email does not match");

        })
    });

    // return id if URL is provided as Google.com
    it("should return email as johhny@fuckmail.com but unique ID printed should be different for facebook.com", function() {
        return meta.allowSignin.call("www.facebook.com", true, true, {from: accounts[0]}).then(function(userArray) {
            var id = userArray[0];
            console.log("Modified Id is:: " + id);
            var email = toAscii(userArray[2]);
            assert.equal(email, "johnny@fuckmail.com", "Email does not match");
        })
    });

    // return id if URL is provided as Google.com
    it("should return email as johhny@fuckmail.com but unique ID printed should be different for Google.com", function() {
        return meta.allowSignin.call("www.google.com", true, true, {from: accounts[0]}).then(function(userArray) {
            var id = userArray[0];
            console.log("Modified Id is:: " + id);
            var email = toAscii(userArray[2]);
            assert.equal(email, "johnny@fuckmail.com", "Email does not match");
        })
    });

    // Should return email as empty if 3rd parameter passed as False
    it("should return email as empty", function() {
        return meta.allowSignin.call("www.google.com", true, false, {from: accounts[0]}).then(function(userArray) {
            var id = userArray[0];
            console.log("Modified Id is:: " + id);
            var email = toAscii(userArray[2]);
            assert.equal(email, "", "Email does not match");
        })
    });


    // Should return name as empty if 3rd parameter passed as False
    it("should return name as empty", function() {
        return meta.allowSignin.call("www.google.com", false, false, {from: accounts[0]}).then(function(userArray) {
            var id = userArray[0];
            console.log("Modified Id is:: " + id);
            var name = toAscii(userArray[1]);
            assert.equal(name, "", "Email does not match");
        })
    });

    it("should not return name as Jitin Pillai if another address is passed", function() {
        return meta.getUser.call({from: accounts[0]}).then(function(userArray) {
            var name = toAscii(userArray[1]);
            assert.notEqual(name, "Jitin Pillai", "Name should not match");
        });
    });
});

toAscii = (hex) => {
    var str = '',
        i = 0,
        l = hex.length;
    if (hex.substring(0, 2) === '0x') {
        i = 2;
    }
    for (; i < l; i+=2) {
        var code = parseInt(hex.substr(i, 2), 16);
        if (code === 0) continue; // this is added
        str += String.fromCharCode(code);
    }
    return str;
};
