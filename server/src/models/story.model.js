import mongoose from 'mongoose';

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    url: {
      type: String,
      required: true
    },

    points: {
      type: Number,
      default: 0
    },

    author: {
      type: String,
      default: 'Unknown'
    },

    postedAt: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const StoryModel = mongoose.models.Story || mongoose.model('Story', storySchema);

export default StoryModel;
