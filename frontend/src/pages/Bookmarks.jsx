import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import StoryCard from "../components/StoryCard";

import { useAuth } from "../context/AuthContext";

function Bookmarks() {
  const { user } = useAuth();

  const [stories, setStories] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    try {
      const { data } = await api.get("/stories");

      const bookmarkedStories = data.stories.filter((story) =>
        user?.bookmarks?.includes(story._id),
      );

      setStories(bookmarkedStories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStories();
  }, []);

  const handleBookmark = async (storyId) => {
    try {
      await api.post(`/stories/${storyId}/bookmark`);

      setStories((prev) => prev.filter((story) => story._id !== storyId));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p className="p-5">Loading bookmarks...</p>;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Bookmarks</h1>

        {stories.length === 0 ? (
          <p>No bookmarks yet.</p>
        ) : (
          <div className="grid gap-5">
            {stories.map((story) => (
              <StoryCard
                key={story._id}
                story={story}
                user={user}
                onBookmark={handleBookmark}
                isBookmarked={true}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Bookmarks;
