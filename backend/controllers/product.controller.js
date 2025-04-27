import Product from '../modules/product.module.js'
import moongose from 'mongoose'


export const createProduct = async (req, res) => {

  const product = req.body // data sent by the client 

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ sucess: false, message: 'Please fill all the fields' })
  }

  const newProduct = new Product(product)

  try {
    await newProduct.save()
    res.status(201).json({ sucess: true, message: 'Product succefully created', data: newProduct })
  } catch (error) {
    console.error('Error creating product :', error.message)
    res.status(500).json({ sucess: false, message: 'Server error' })
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params
  const userProduct = req.body // data which has been sent by client

  if (!moongose.Types.ObjectId.isInvalid(id)) {
    return res.status(400).json({ sucess: false, message: 'Invalid product id' })
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, userProduct, { new: true, })
    if (!updatedProduct) {
      return res.status(404).json({ sucess: false, message: 'Product not found' })
    }
    res.status(200).json({ sucess: true, message: 'Product updated successfully', data: updatedProduct })

  } catch (error) {
    console.error('Error updating product :', error.message)
    res.status(500).json({ sucess: false, message: 'Server error' })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  if (!moongose.Types.ObjectId.isInvalid(id)) {
    return res.status(400).json({ sucess: false, message: 'Invalid product id' })
  }

  try {
    await Product.findByIdAndDelete(id)
    res.status(200).json({ sucess: true, message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product :', error.message)
    res.status(404).json({ sucess: false, message: 'Product not found' })
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ sucess: true, message: 'Products fetched sucessfully', data: products })
  } catch (error) {
    console.error('Error fethcing products :', error.message)
    res.status(500).json({ sucess: false, message: 'Server error' })
  }
}
