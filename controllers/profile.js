const getProfile = (req, res, db) => {
    const { id } = req.params;

    db('users').where('id', id).then(user => {
        if(user.length){
            res.send(user[0])
        }
        else{
            res.status(400).json('Not Found')
        }
    }).catch(err => res.status(400).json('Not Found'))
}

module.exports = {
	getProfile: getProfile
}