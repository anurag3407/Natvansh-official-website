import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAlumni extends Document {
  name: string;
  role: string;
  company: string;
  batch: string;
  image: string;
  imageTransform: {
    x: number;
    y: number;
    scale: number;
  };
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const AlumniSchema = new Schema<IAlumni>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true }, // former role in Natvansh
    company: { type: String, default: "" }, // current status
    batch: { type: String, required: true }, // e.g., 2023
    image: { type: String, default: "" },
    imageTransform: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      scale: { type: Number, default: 1 },
    },
    socialLinks: {
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      email: { type: String, default: "" },
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Alumni: Model<IAlumni> =
  mongoose.models.Alumni || mongoose.model<IAlumni>("Alumni", AlumniSchema);

export default Alumni;
