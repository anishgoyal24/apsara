import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },

    enabled: {
        type: Boolean,
        default: true
    }
});

const Category = mongoose.model('Category', CategorySchema);

export { Category }