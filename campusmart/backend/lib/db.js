const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not configured");
        }
        const mongouri = await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connected at ", mongouri.connection.host);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = connectdb; 