import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProfessor extends Document {
  name: string;
  designation: string;
  department: string;
  message: string;
  image: string;
  isCurrent: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProfessorSchema = new Schema<IProfessor>(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    message: { type: String, default: "" },
    image: { type: String, default: "" },
    isCurrent: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Professor: Model<IProfessor> =
  mongoose.models.Professor || mongoose.model<IProfessor>("Professor", ProfessorSchema);

export default Professor;
