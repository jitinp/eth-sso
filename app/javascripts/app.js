// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// // Import our contract artifacts and turn them into usable abstractions.
 import signup_artifacts from '../../build/contracts/Signup.json'

// Signup is the main registration contract
 var Signup = contract(signup_artifacts);
 
window.App = {
  start: function() {
    let self = this;
    // Bootstrap the MetaCoin abstraction for Use.
    Signup.setProvider(web3.currentProvider);
    let signupInstance;
    let name, email;
    web3.eth.getAccounts(function(error, accounts) {
      if(error) {
        console.log(error);
      }
      const account = accounts[0];
      console.log(account);
      // Get Name & Email for current address
      Signup.deployed().then(function(instance) {
        signupInstance = instance;
        return signupInstance.getUser({from: account});
      }).then(function(userArray) {
        console.log(userArray);
        name = toString(userArray[1]);
        email = toString(userArray[2]);
        // if name & email is not 0x000, hide Register Module and display Name & Email
        if(name != "" && email != "") {
          // hide register module
          let registerDiv = document.getElementById("register");
          if(registerDiv != null)
            registerDiv.hidden = true;
          // unhide Welcome module
          let updateDiv = document.getElementById("update");
          if(updateDiv != null) {
            updateDiv.hidden = false;
            // welcome user by name
            let userName = document.getElementById("welcome");
            userName.innerHTML = userName.innerHTML + name;
            // Update name & email fields
            let nameField = document.getElementById("nameUpdate");
            nameField.value = name;
            let emailField = document.getElementById("emailUpdate");
            emailField.value = email;
          }
          // Activate share SSO module on Authenticate page
          let sharesso = document.getElementById("sharesso");
          if(sharesso != null) {
            sharesso.hidden = false;
            // welcome user by name
            let userName = document.getElementById("welcome");
            userName.innerHTML = userName.innerHTML + name;
            // Display message to authenticate app
            let authenticateMessage = document.getElementById("authMessage");
            let getData = _GET();
            let localhost = getData['hostname'];
            let callbackurl = getData['callbackurl'];
            authenticateMessage.innerHTML = "Authenticate " + localhost + " to register you?";
          }
        }
      }).catch(function(error) {
        console.log(error);
      });
    });

  },

  // Register User
  // Accept Name & Email from user
  registerUser: function() {
    var self  = this;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    console.log("Update function: Name:: " + name + " email: " + email);
    var signup;
    web3.eth.getAccounts(function(error, accounts) {
      if(error) {
        console.log(error);
      }
      var account = accounts[0];
      console.log(account);
      Signup.deployed().then(function(instance) {
        signup = instance;
        return instance.setUser(name, email, {from: account});
      }).then(function() {
        // update action
      }).catch(function(e) {
        console.log(e);
      });
    });
  },

  // Update User
  // Accept Name & Email from user
  updateUser: function() {
    var self  = this;
    var name = document.getElementById("nameUpdate").value;
    var email = document.getElementById("emailUpdate").value;
    console.log("Update function: Name:: " + name + " email: " + email);
    var signup;
    web3.eth.getAccounts(function(error, accounts) {
      if(error) {
        console.log(error);
      }
      var account = accounts[0];
      console.log(account);
      Signup.deployed().then(function(instance) {
        signup = instance;
        return instance.setUser(name, email, {from: account});
      }).then(function() {
        // any action? 
      }).catch(function(e) {
        console.log(e);
      });
    });
  },

  // Update User
  // Accept Name & Email from user
  signInUser: function() {
    var self  = this;
    let isName = document.getElementById("isName").checked;
    let isEmail = document.getElementById("isEmail").checked;
    console.log("Update function: Name:: " + isName + " email: " + isEmail);
    let getData = _GET();
    let localhost = getData['hostname'];
    let callbackurl = getData['callbackurl'];
    let authenticate;
    web3.eth.getAccounts(function(error, accounts) {
      if(error) {
        console.log(error);
      }
      let account = accounts[0];
      console.log(account);
      Signup.deployed().then(function(instance) {
        authenticate = instance;
        return instance.allowSignin(localhost, isName, isEmail, {from: account});
      }).then(function(userArray) {
        console.log("Values to authenticate");
        let userObject = {id: userArray[0], name: toString(userArray[1]), email: toString(userArray[2])};
        console.log(userObject);
        // pass it back in callback URL call and redirect
        callbackURLAndPostValues(callbackurl, userObject);
      }).catch(function(e) {
        console.log(e);
      });
    });
  }  
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  }
  App.start();
});

// Convert Hex to String
let toString = (hex) => {
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
  console.log(str);
  return str;
};

let _GET = () => {
  let _get = {};
  let re = /[?&]([^=&]+)(=?)([^&]*)/g;
  let m;
  while (m = re.exec(location.search))
      _get[decodeURIComponent(m[1])] = (m[2] == '=' ? decodeURIComponent(m[3]) : true);
  return _get;
};


let callbackURLAndPostValues = (callbackURL, params) => {
  const path = callbackURL;
  const method = "GET";
  let form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);
  console.log(params);
  for(let key in params) {
      if(params.hasOwnProperty(key)) {
          console.log(key + " :: " + params[key]);
          var hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", params[key]);
          form.appendChild(hiddenField);
      }
  }
  document.body.appendChild(form);
  form.submit();
}