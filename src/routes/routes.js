import express from 'express'
import axios from 'axios'
import { DBMock } from '../../db-mock.js'
import * as usersService from '../services/usersService.js'

const router = express.Router();
//const userService = new usersService().getUsers()
const dbMock = new DBMock()

const routes = () => {
	router.get('/users', async function (req, res) {
		const users = await usersService.getUsers();
		res.json(users);
	});
}

export default routes