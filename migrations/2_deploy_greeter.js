const GreeterContract = artifacts.require('Greeter');

function proc(deployer) {
    deployer.deploy(GreeterContract);
}

module.exports = proc;
