//manejo de archivos
//const fs = require ('fs'); 
import fs from 'fs';

class ProductManager {
    #products;
    #path;

    static #instance; // variable on define

    constructor (){
        if(ProductManager.#instance)
            return ProductManager.#instance;
        this.#path = './src/data/productos.json';
        this.#products = this.#leerProductosInFile();

        ProductManager.#instance = this; // ayuda a no regar instancias 
    }

    #asignarIdProducto() {
        let id = 1;
        if(this.#products.length != 0)
        id = this.#products[this.#products.length-1].id + 1;
        return id;
    }

    #leerProductosInFile() {
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
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
        } catch (error) {
            console.log(`ocurrio un error al guardar el archivo de productos, ${error}`);
        }
    }

    addProduct ({title, description, price, thumbnails=[], code, stock, category, status = true}) {

        let result = 'an error occurred!';

        if(!title || !description || !price || !code || !stock || !category)
            result = 'All parameters are required [title, description, price, code, stock, category]';
        else{
            const repeatedCode = this.#products.some(p=> p.code == code); //validar que no se repita el codigo y id autoincrementar
            if(repeatedCode)
                result = `The code ${code} is already registered in another product`;
            else{
                const id = this.#asignarIdProducto();

                const newProduct = {
                    id,
                    title,
                    description,
                    price,
                    thumbnails,
                    code,
                    stock,
                    category,
                    status
                };
                this.#products.push(newProduct);
                this.#guardaArchivo();
                result = {
                    msg : 'Product added successfully!',
                    producto: newProduct
                };
            }
        }
        return result;
    }

    
    getProduct(limit = 0) {
        limit = Number(limit);
        if (limit > 0)
            return this.#products.slice(0, limit); 
        return this.#products;
    }

    getProductById(id) {
        let status = false;
        let resp = `Product with id ${id} does not exist`;

        const producto = this.#products.find(p=> p.id == id);
            if(producto){
                status=true;
                resp=producto
            }

            return {status, resp} // retorno un objeto con status y resp (respueta)
    }

    updateProduct(id, objetUpdate) {
        let result = `Product with id ${id} does not exist`;

        const index = this.#products.findIndex(p => p.id === id);

        if(index !== -1) {
            const {id, ...rest} = objetUpdate;
            const propiedadesPermitidas = ['title', 'description', 'price', 'thumbnails', 'code', 'stock', 'category', 'status'];
            const propiedadesActualizadas = Object.keys(rest)
                .filter(propiedad => propiedadesPermitidas.includes(propiedad))
                .reduce((obj,key)=>{
                    obj[key]= rest[key];
                    return obj;
                }, {});
            this.#products[index] = {...this.#products[index], ...propiedadesActualizadas};
            this.#guardaArchivo();
            result = {
                msg: 'Product added successfully!',
                producto: this.#products[index]
            };
        }
        return result;
    }

    deleteProduct(id) {
        let msg = `Product with id ${id} does not exist`;

        const index = this.#products.findIndex(p=> p.id === id);
        if(index !== -1) {
            this.#products = this.#products.filter(p=> p.id !== id);
            this.#guardaArchivo();
            msg = 'Removed product'
        }

        return msg;
    }
}

//module.exports = PoductManager;
export default ProductManager;