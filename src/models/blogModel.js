const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = new mongoose.model("blogs", blogSchema)
