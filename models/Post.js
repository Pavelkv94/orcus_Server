const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
    title: { type: String },
    category: { type: String },
    text: { type: String },
});

module.exports = model("Post", PostSchema);
