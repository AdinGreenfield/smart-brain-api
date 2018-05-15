const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'c33dc87ce74047118be40e05eb663774'
});

const handleApiCall = (req, res) => {
	app.models.predict("e466caa0619f444ab97497640cefc4dc", req.body.input)
	.then(data => { 
		console.log(data);
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to get prediction'))
}

const countEntries = ( req, res, db )=> {
    const { id } = req.body;

    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.send(entries[0])
    })
    .catch(err => res.status(400).send('not able to increment'))
}

module.exports = {
	countEntries: countEntries,
	handleApiCall: handleApiCall
}