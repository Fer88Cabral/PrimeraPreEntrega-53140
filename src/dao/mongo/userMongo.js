//import {userModel} from "../dao/model/users.js";
import {userModel} from './models/userModel.js';

export const getUserById = async (id) => await userModel.findById(id);

export const getUserByEmail = async (email) => await userModel.findOne({email});

export const registerUser = async (user) => await userModel.create({...user});
