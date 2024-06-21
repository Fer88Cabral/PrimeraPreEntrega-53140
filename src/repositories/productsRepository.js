import {ProductDao} from "../dao/index.js"
import { addProductInCart } from "../dao/mongo/cartsMongo.js";

export const getProducts = async (query) => await ProductDao.getProducts(query);
export const getProductById = async (pid) => await ProductDao.getProductById(pid);
export const addProduct = async (body) => await ProductDao.addProduct(body);
export const updateProduct = async (pid, rest) => await ProductDao.updateProduct(pid, rest);
export const deleteProduct = async (pid) => await ProductDao.deleteProduct(pid);