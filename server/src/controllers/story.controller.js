import Story from '../models/story.model.js';
import User from '../models/user.model.js';

export const getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ points: -1 }).limit(10);

    res.status(200).json({
      success: true,
      count: stories.length,
      stories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getSingleStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }

    res.status(200).json({
      success: true,
      story
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const storyId = req.params.id;

    const isBookmarked = user.bookmarks.some((bookmark) => bookmark.toString() === storyId);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter((bookmark) => bookmark.toString() !== storyId);
    } else {
      user.bookmarks.push(storyId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      bookmarks: user.bookmarks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
