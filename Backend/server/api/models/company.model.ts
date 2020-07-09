import mongoose from 'mongoose';

const { Schema } = mongoose;

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },

    enabled: {
        type: Boolean,
        default: true
    }
});

const Company = mongoose.model('Company', CompanySchema);

export { Company }