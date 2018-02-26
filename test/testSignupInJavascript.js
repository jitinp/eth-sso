var Signup = artifacts.require("./Signup.sol");

contract('Signup', function(accounts) {

    var meta;

    // Call the contract and Register with name & email
    beforeEach(function() {
        return Signup.deployed().then(function(instance) {
            meta = instance;
            console.log(accounts[0]);
            meta.setUser("Jitin Pillai", "jitin2pillai@gmail.com");  
        }).catch(function(e) {
            console.log(e);
        });
    });

    it("Should return name as Jitin Pillai", function() {

        return meta.getUser_.call(accounts[0]).then(function(userArray) {
            var name = toAscii(userArray[1]);
            assert.equal(name, "Jitin Pillai", "Name does not match");
        });
    });

    it("Should return email as jitin2pillai@gmail.com", function() {

        return meta.getUser_.call(accounts[0]).then(function(userArray) {
            var name = toAscii(userArray[2]);
            assert.equal(name, "jitin2pillai@gmail.com", "Email does not match");
        });
    });

    it("should not return name as Jitin Pillai if another address is passed", function() {
        return meta.getUser_.call(accounts[2].then(function(userArray) {
            var name = toAscii(userArray[1]);
            assert.equal(name, "Jitin Pillai", "Name should not match");
        }));
    });
});

toAscii = function(hex) {
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
