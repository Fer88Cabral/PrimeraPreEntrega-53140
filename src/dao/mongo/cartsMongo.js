//import { cartModel } from "../dao/model/carts.js"; 
import {cartModel} from './models/cartsModel.js';

export const getCartById = async (cid) => await cartModel.findById(cid).populate('products.id').lean(); 

export const createCart = async () => await cartModel.create({}); 

export const addProductInCart = async (cid, pid) =>{
    
    const carrito = await cartModel.findById(cid);

    if(!carrito)
        return null;

    const productoInCart = carrito.products.find(p=>p.id.toString() === pid);

    if(productoInCart)
        productoInCart.quantity++;
    else 
        carrito.products.push({ id: pid, quantity: 1 });

    carrito.save();

    return carrito; 
};

export const deleteProductsInCart = async (cid, pid) => 
    await cartModel.findByIdAndUpdate(cid, {$pull:{'products':{id:pid}}}, {new: true}); 

export const updateProductsInCart = async (cid, pid, quantity) => 
    await cartModel.findOneAndUpdate(
        {_id: cid, 'products.id': pid},                  // la busqueda y el producto dentro 
        {$set: {'products.$.quantity': quantity}},      // seteo con la nueva propiedad quantity
        {new: true}                                    // nuevo 
    );

export const deleteCart = async (cid) => await cartModel.findByIdAndDelete(cid);                                             
