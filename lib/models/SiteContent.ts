import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteContent extends Document {
  section: "hero" | "intro" | "professor";
  title: string;
  content: string;
  image: string;
  metadata: Record<string, string>;
  updatedAt: Date;
}

const SiteContentSchema = new Schema<ISiteContent>(
  {
    section: {
      type: String,
      enum: ["hero", "intro", "professor"],
      required: true,
      unique: true,
    },
    title: { type: String, default: "" },
    content: { type: String, default: "" },
    image: { type: String, default: "" },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

const SiteContent: Model<ISiteContent> =
  mongoose.models.SiteContent || mongoose.model<ISiteContent>("SiteContent", SiteContentSchema);

export default SiteContent;
