import { cartModel } from "../dao/model/carts.js";

export const getCartByIdService = async (cid) =>{
    try {
        return await cartModel.findById(cid).populate('products.id').lean();
    } catch (error) {
        console.log('getCartByIdService -> ', error);
        throw error;
    }
};

export const createCartService = async () =>{
    try {
        return await cartModel.create({});
    } catch (error) {
        console.log('createCartService -> ', error);
        throw error;
    }
};

export const addProductInCartService = async (cid, pid) =>{
    try {
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
    } catch (error) {
        console.log('addProductInCartService -> ', error);
        throw error;
    }
};

export const deleteProductsInCartService = async (cid, pid) => {
    try {
        return await cartModel.findByIdAndUpdate(cid, {$pull:{'products':{id:pid}}}, {new: true}); // funcion "$pull", elimina de nuestro array products, id, con el, pid, con eso actualiza 
    } catch (error) {
        console.log('deleteProductsInCartService -> ', error);
        throw error;
    }
};

export const updateProductsInCartService = async (cid, pid, quantity) => {
    try {
        return await cartModel.findOneAndUpdate(
            {_id: cid, 'products.id': pid},                  // la busqueda y el producto dentro 
            {$set: {'products.$.quantity': quantity}},      // seteo con la nueva propiedad quantity
            {new: true}                                    // nuevo 
        );
    } catch (error) {
        console.log('updateProductsInCartService -> ', error);
        throw error;
    }
};

export const deleteCartService = async (cid) => {
    try {
        //return await cartModel.findByIdAndUpdate(cid, {$set:{'products': [] }}, {new: true});     // aca podemos eliminar por id producto sin que desaparezca el carrito
        return await cartModel.findByIdAndDelete(cid);                                              // aca eliminamo el carrtio completo
    } catch (error) {
        console.log('deleteCartService -> ', error);
        throw error;
    }
};