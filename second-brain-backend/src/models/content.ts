import mongoose, { model, Schema } from "mongoose";

const ContentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["youtube", "twitter", "other"],
    required: true,
  },
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  titleEmbeddings: {
    type: [Number],
    required: true,
  },
  descriptionEmbeddings: {
    type: [Number],
    required: true,
  },
},
{
  timestamps: true,
});

export const ContentModel = model("Content", ContentSchema);
