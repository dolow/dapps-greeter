const GreeterContract = artifacts.require('Greeter');

contract('Greeter', (accounts) => {
    it('has been deployed', async () => {
        const greeter = await GreeterContract.deployed();
        assert(greeter, 'GreeterContract not deployed');
    });
/*
    context('getOwner()', () => {
        it('should return some address', async () => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.getOwner();
            assert(owner, 'owner does not exists');
        });

        it('should match actual owner', async () => {
            const greeter = await GreeterContract.deployed();
            const expected = accounts[0];
            const actual = await greeter.getOwner();
            assert(actual === expected, `${actual} is returned`);
        });
    });
*/
    context('greet()', () => {
        it('should return "Hello World !!"', async () => {
            const expected = 'Hello World !!';
            const greeter = await GreeterContract.deployed();
            const actual = await greeter.greet();
            assert(expected === actual, `"${actual}" returned`);
        });
    });

    context('setDynamicMessage()', () => {
        it('should be set by owner', async () => {
            let expected = 'Set by owner !!';
            const greeter = await GreeterContract.deployed();

            await greeter.setDynamicMessage(expected);
            let actual = await greeter.dynamicMessage();

            assert(expected === actual, `"${actual}" returned`);

            expected = 'Set by owner again !!';

            await greeter.setDynamicMessage(expected, { from: accounts[0] });
            actual = await greeter.dynamicMessage();

            assert(expected === actual, `"${actual}" returned`);
        });

        it('should not be set by not owner', async () => {
            const expected = 'Ownable: caller is not the owner';
            const notExpected = 'Set by owner !!';
            const greeter = await GreeterContract.deployed();

            try {
                await greeter.setDynamicMessage(expected, { from: accounts[1] });
            } catch (e) {
                assert(e.reason === expected, `"${e.reason}" occured`);
                return;
            }

            const actual = await greeter.dynamicMessage();
            assert(notExpected === actual, 'unexpectedly edited');
        });
    });

    context('dynamicMessage()', () => {
        it('should return string value set via setDynamicMessage', async () => {
            const expected = 'Hello Dynamic World !!';
            const greeter = await GreeterContract.deployed();

            let actual = await greeter.dynamicMessage();
            assert(expected !== actual, `"${actual}" returned`);

            await greeter.setDynamicMessage(expected);

            actual = await greeter.dynamicMessage();
            assert(expected === actual, `"${actual}" returned`);
        });
    });
});
