const db = require('../../database/models');
// const Op = db.Sequelize.Op;
const Movies = db.Movies;

module.exports = {
	index: (req, res) => {
		Movies
			.findAll({
				attributes: ['id', 'title', 'genre_id']
			})
			.then(movies => {
				let result = {
					metadata: {
						url: req.originalUrl,
						quantity: movies.length
					},
					data: movies
				}
				return res.json(result);
			}).catch(err => {
				return res.status(500).json({
					metadata: {
						status: res.status,
						msg: 'No puedo conectar con la DB'
					}
				});
			});
	},
	store: (req, res) => {
		Movies
			.create(req.body)
			.then(movieSaved => {
				return res.status(201).json({
					metadata: {
						status: 'OK se guardó'
					},
					url: req.originalUrl + '/' + movieSaved.id,
					loQueSeGuardoEnLaDB: movieSaved
				})
			}).catch(err => {
				return res.json(err);
			});
		
	},
	show: (req, res) => {
		Movies
			.findByPk(req.params.id)
			.then(movie => {
				if (movie) {
					return res.send({
						metadata: {
							status: 'OK vino la movie'
						},
						url: req.originalUrl,
						laPeli: movie
					})
				}
				return res.status(404).json({
					metadata: {
						status: 404,
						data: 'Not found che'
					}
				})
			})
			.catch(error => console.log(error));
	},
}