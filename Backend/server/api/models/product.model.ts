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

    url: {
        type: String,
        required: false,
    },

    photo: {
        type: String,
        required: false
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
    }
});

const Product = mongoose.model('Product', ProductSchema);

export { Product }