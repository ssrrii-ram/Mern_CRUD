import Product from '../models/product.model.js';
import mongoose from 'mongoose';
export const getProducts = async (req, res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success:true, data: products})
    } catch(error){
        console.log("error in fetching products", error.message)
        res.status(500).json({success:false, message: "server error"})
    }
}

export const updateProduct = async (req,res) =>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: 'invalid Product id'})
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true})
        res.status(200).json({success:true, data: updatedProduct})
    }catch(error){
        console.log('error in updating products', error.message)
        res.status(500).json({success:false, message: "server error"})
    }
}

export const createProduct = async (req, res)=>{
    const product = req.body; // this will be sent by the user

    if (!product.name ||  !product.price || !product.image){
        console.log(product)
        return res.status(411).json({
            success: false, message: "Please provide all fields"})
    }


    const newProduct = new Product(product) // Product --> this is from mongoose & product from body

    try{
        await newProduct.save()
        res.status(201).json({success: true, data: newProduct})
    }
    catch(error){
        console.error("errror in Product Creation:", error.message);
        res.status(500).json({success: false, message: "Server Error"}) // 500 code is internal server error
    }
}

 export const deleteProduct = async (req, res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: 'invalid Product id'})
    }

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "product deleted"})
    }
    catch(error){
        res.status(500).json({success: false, message: "Server Error"})

    }
    
}