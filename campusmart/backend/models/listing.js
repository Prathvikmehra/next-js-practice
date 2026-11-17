const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        category: {
            type: String,
            required: true,
        },

        condition: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },

        sellerName: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["Available", "Reserved", "Sold"],
            default: "Available",
        },
    },
    {
        timestamps: true,
    }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
