import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryImage extends Document {
  title: string;
  image: string;
  category: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, default: "General" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const GalleryImage: Model<IGalleryImage> =
  mongoose.models.GalleryImage || mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);

export default GalleryImage;
