import fs from 'fs';
import ProductManager from './productManager.js';

class CartsManager {
    #carts;
    #path;
    static idProducto = 0;

    constructor (){
        this.#path = './src/data/carritos.json';
        this.#carts = this.#leerCarritosInFile();
    }

    #asignarIdCart() {
        let id = 1;
        if(this.#carts.length != 0)
        id = this.#carts[this.#carts.length-1].id + 1;
        return id;
    }

    #leerCarritosInFile() {
        try {
            if(fs.existsSync(this.#path)) 
                return JSON.parse(fs.readFileSync(this.#path,'utf-8'));
            
            return[];
        } catch (error) {
            console.log(`ocurrio un error al leer el archivo de productos, ${error}`);
        }
    }

    #guardaArchivo(){
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#carts))
        } catch (error) {
            console.log(`ocurrio un error al guardar el archivo de productos, ${error}`);
        }
    }

createCart() {
    const newCart = {
        id: this.#asignarIdCart(),
        products: []
    };
    
    this.#carts.push(newCart);
    this.#guardaArchivo();

    return newCart;
}

    getCartById(id) {
        // NOT FOUND
        const producto = this.#carts.find(p=> p.id == id);
            if(producto)
                return producto;
            else
                return `Not found is ${id}`;
    }

    addProductInCart(cid, pit){

        let respuesta = `Cart with id ${cid} does not exist`;

        const indexCarrito = this.#carts.findIndex(c => c.id === cid);

        if(indexCarrito !==-1){
            const indexProductoInCart = this.#carts[indexCarrito].products.findIndex(p => p.id === pid); 
            const p = new ProductManager();
            const producto = p.getProductById(pid);

            if(producto.status && indexProductoInCart === -1) {
                this.#carts[indexCarrito].products.push({id: pid, 'quantity': 1}); 
                this.#guardaArchivo();
                respuesta = 'product added to cart'
            }else if(producto.status && indexProductoInCart !== -1){
                ++this.#carts[indexCarrito].products[indexProductoInCart].quantity;
                this.#guardaArchivo();
                respuesta = 'product added to cart';
            }else{
                respuesta = `Product with id ${pid} does not exist`; 
            }
        } 
    }

}

export default CartsManager;