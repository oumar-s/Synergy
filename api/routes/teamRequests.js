const express = require('express');
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require('../models');
const { TeamRequest, User, Team, TeamMember } = db;

//Get all requests of a specific team
router.get('/:teamId', async (req, res) => {
	try {
		const teamId = req.params.teamId;
		const requests = await TeamRequest.findAll({
			where: {
				teamID: teamId,
				status: "Pending"
			},
			include: [
				{
					model: User,
					as: "user",
					attributes: ["id", "firstName", "lastName"],
				},
				{
					model: Team,
					as: "team",
					attributes: ["id", "teamName"],
				}
			]
		})
		res.status(200).json(requests);
	} catch (err) {
		res.status(400).json(err);
	}
});

//Add a request to join a specific team
router.post('/:teamId', async (req, res) => {
	try {
		const teamId = req.params.teamId;
		const userId = req.user.id;
		const team = await TeamRequest.create({
			status: "Pending",
			teamID: teamId,
			userID: userId,
		})
		res.status(201).json(team);
	} catch (err) {
		res.status(400).json(err);
	}
});

//update a request
router.put('/:requestId', async (req, res) => {
	try {
		const requestId = req.params.requestId;
		const status = req.body.status;
		const request = await TeamRequest.findByPk(requestId);
		request.status = status;
		await request.save();
		res.status(200).json(request);
	} catch (err) {
		res.status(400).json(err);
	}
});



module.exports = router;