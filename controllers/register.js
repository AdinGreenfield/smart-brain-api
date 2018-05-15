const handleRegister = (req, res, db, bcrypt) => {
    const {email, name, password} = req.body;

    if(!email || !name || !password){
        return res.status(400).json('incorect form submission')
    }

    const hash = bcrypt.hashSync(password);
    //transaction to add email and hash in login db and 
    //new user to users db.
    db.transaction(trx => {
        trx('login')
        .insert({
            hash: hash,
            email: email
        })
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            }).then(user => {
                res.json(user[0])
            }) 
        })
        .then(trx.commit)
        .catch(trx.rollback)
        
    })
    .catch(err => res.status(400).json('unable to register 2')) 
}

module.exports = {
    handleRegister: handleRegister 
};