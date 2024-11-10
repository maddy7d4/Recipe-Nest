import mongoose, { model, models, Schema } from "mongoose";


export const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        virtuals: true
    }
})

// postSchema.virtual("createdAt").get(function () {
//     return this._id.getTimestamp();
// })

// postSchema.virtual("updatedAt").get(function () {
//     return new Date(this._id.getTimestamp() * 1000);
// })

postSchema.virtual("shortDescription").get(function () {
    return this.description ? this.description.substring(0, 250) + "..." : "";
})

export const postModel = models.Post || model("Post", postSchema)
