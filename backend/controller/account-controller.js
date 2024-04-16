const { Account, User } = require("../db");

async function getBalance(req,res)
{

    const account=await Account.findOne({
        userId:req.userId
    })

    return res.status(200).json({balance:account.balance});

}

async function transferMoney(req,res)
{
    const {to,amount}=req.body;

    const account=await Account.findOne({
        userId:req.userId
    })

    if(account.balance<amount)
    {
        return res.status(400).json({
            message:'Insufficient balance'
        })
    }

    const toAccount=await Account.findOne({
        userId:to
    })

    if(!toAccount)
    {
        return res.status(400).json({
            message:'account does not exists'
        })
    }
        await Account.updateOne({
            userId:req.userId,

        },
    {
        $inc:{
            balance: -amount
        }
    })
        await Account.updateOne({
            userId:to,

        },
    {
        $inc:{
            balance: amount
        }
    })
res.status(200).json({
    message:'Money transferred successfully'
})



}
module.exports={
    getBalance,
    transferMoney
    
}