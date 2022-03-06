const Hao = artifacts.require("Hao");
const Pool = artifacts.require("Pool");

contract("Pool Test", ([owner, user, customer]) => {
  let hao, pool;

  function tokens(number) {
    return web3.utils.toWei(`${number}`, "ether");
  }

  function fromTokens(number) {
    return web3.utils.fromWei(`${number}`, "ether");
  }

  before(async () => {
    hao = await Hao.new();

    pool = await Pool.new(hao.address);

    await hao.transfer(user, tokens(100));

    await hao.transfer(customer, tokens(500));
  });

  describe("Stake Pool", () => {
    it('Stake Pool name', async() => {
        const name = await pool.name();
        assert.equal(name, "Hao Stake Pool", "Pool name is wrong");
    });

    // it('Stake Hao Token', async() => {
    //     await hao.approve(pool.address, tokens(100), { from: user });

    //     await pool.stake(tokens(100), { from: user });

    //     const userStakeBalance = await pool.stakeBalance(user);

    //     const userBalance = await hao.balanceOf(user);

    //     assert.equal(userStakeBalance, tokens(100), "stake balance is not correct");

    //     assert.equal(userBalance, tokens(0), "user balance is not zero");
    // })

    // it('Stake Hao Token and get total staked', async() => {
    //     await hao.approve(pool.address, tokens(100), { from: customer });

    //     await pool.stake(tokens(100), { from: customer });

    //     const totalStaked = await pool.totalStaked();

    //     assert.equal(totalStaked, tokens(200), "totalStaked is not 200");
    // })

    // it('Unstake Hao Token and get total staked', async() => {
    //     await pool.unstake(tokens(100), { from: customer });
        
    //     const totalStaked = await pool.totalStaked();

    //     assert.equal(totalStaked, tokens(100), "totalStaked is not 100");
    // })

    it('Stake', async () => {
      await hao.approve(pool.address, tokens(100), { from: owner });

      await pool.stake(tokens(100), { from: owner });
        
      let totalStaked = await pool.totalStaked();

      assert.equal(totalStaked.toString(), tokens(100), "totalStaked is not 100");

    })

    it('unstake', async () => {
      await pool.unstake(tokens(100), { from: owner });

      totalStaked = await pool.totalStaked();

      assert.equal(totalStaked.toString(), tokens(0), "totalStaked is not 0");
    });

    it('stake again', async() => {
      await hao.approve(pool.address, tokens(50), { from: owner });

      await pool.stake(tokens(50), { from: owner });
        
      let totalStaked = await pool.totalStaked();

      assert.equal(totalStaked.toString(), tokens(50), "totalStaked is not 51");
    })

    it('unstake again', async() => {
      await pool.unstake(tokens(50), { from: owner });

      totalStaked = await pool.totalStaked();

      assert.equal(totalStaked.toString(), tokens(0), "totalStaked is not 0");
    })

  });
});

// Stake 500   Daily 5000 =>
