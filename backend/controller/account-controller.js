const { Account } = require("../db");

async function getBalance(req,res)
{

    const account=await Account.findOne({
        userId:req.userId
    })

    return res.status(200).json({balance:account.balance});

}

module.exports={
    getBalance
}