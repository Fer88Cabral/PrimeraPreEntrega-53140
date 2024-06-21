import { request, response } from "express";
import {CartsRepository, ProductsRepository} from '../repositories/index.js';


export const homeView = async (req=request, res=response) => {
    const limit = 50;
    const {payload} = await ProductsRepository.getProducts({limit});
    const user = req.session.user;

    return res.render('home',{productos: payload, styles:'styles.css', title:'Home', user});
}

export const realTimeProductsView = async (req=request, res=response) => {
    const user = req.session.user;
    return res.render('realTimeProducts', {title:'Real Time', styles: 'styles.css', user});
}

export const chatView = async (req=request, res=response) => {
    const user = req.session.user;
    return res.render('chat', {styles:'chat.css', title:'Chat', user});
}

export const productsView = async (req=request, res=response) => {
    const result = await ProductsRepository.getProducts({...req.query});
    const user = req.session.user;
    return res.render('products', {title:'productos', result, styles:'products.css', user})
}

export const cartIdView = async (req=request, res=response) => {
    const {cid} = req.params;
    const carrito = await CartsRepository.getCartById(cid);
    const user = req.session.user;
    return res.render('cart', {Title:'carrito', carrito, styles:'cart.css', user});
}

export const loginGet = async (req=request, res=response) => {

    if(req.session.user)
        return res.redirect('/')

    return res.render('login', {title:'Login', styles:'loginRegister.css'});
}

export const registerGet = async (req=request, res=response) => {

    if(req.session.user)
        return res.redirect('/')

    return res.render('register', {title:'Registro', styles:'loginRegister.css'});
}

export const registerPost = async (req=request, res=response) => {

    if(!req.user)
        return res.redirect('/register');

    return res.redirect('/login');
}

export const Login = async (req=request, res=response) => {
    
    if(!req.user)
        return res.redirect('/login');

    req.session.user={
        name:req.user.name,
        lastName:req.user.lastName,
        email:req.user.email,
        rol:req.user.rol,
        image:req.user.image
    }

    return res.redirect('/');
    
}

export const Logout = async (req=request, res=response) => {
    req.session.destroy(err => {
        if(err)
            return res.send({status:false, body: err});
        else 
            return res.redirect('/login');
    });
}
