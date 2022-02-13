const Tether = artifacts.require('Tether');
const Hao = artifacts.require('Hao');

contract('Coin Test', (accounts) => {
    let tether, hao;

    function tokens (number) {
        return web3.utils.toWei(`${number}`, 'ether');
    }

    before(async () => {
        tether = await Tether.new();
        hao = await Hao.new();
        await hao.transfer(accounts[1], tokens(1000));
    });

    it('Hao account1 shold have tokens(1000)', async () => {
        const balance = (await hao.balanceOf(accounts[1]));
        assert.equal(balance, tokens(1000));
    });

    it('account1 can approve account0 transfer token', async () => {
        const user0 = accounts[0]
        const user1 = accounts[1]
        await hao.approve(user0, tokens(1000), { from: user1 })
        await hao.transferFrom(user1, user0, tokens(1000), { from: user0 })

        const b1 = (await hao.balanceOf(user1)).toString();
        assert.equal(b1, tokens(0));
    });
});