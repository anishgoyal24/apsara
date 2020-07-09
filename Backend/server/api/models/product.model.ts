import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }], 

    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: false
    }, 

    url: {
        type: String,
        required: false,
    },

    images: {
        type: Number,
        required: true,
        default: 1
    },

    description: {
        type: String,
        required: true
    },

    type: {
        type: String,
        default: "Wholesale"
    },

    featured: {
        type: Boolean,
        default: false
    },
});

const Product = mongoose.model('Product', ProductSchema);

export { Product }