const passwordValidat=require('password-validator')
const schema=new passwordValidat()

schema
.is().min(6)
.is().max(18)
.has().lowercase()
.has().uppercase()
.has().digits()
.has().symbols()
.has().not().spaces()

module.exports=schema