import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import StoryCard from "../components/StoryCard";

import { useAuth } from "../context/AuthContext";

function Home() {
  const { user, updateBookmarks } = useAuth();

  const [stories, setStories] = useState([]);

  const [bookmarks, setBookmarks] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    try {
      const { data } = await api.get("/stories");

      setStories(data.stories);

      if (user) {
        setBookmarks(user.bookmarks || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleBookmark = async (storyId) => {
    try {
      const { data } = await api.post(`/stories/${storyId}/bookmark`);

      setBookmarks(data.bookmarks);

      updateBookmarks(data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p className="p-5">Loading stories...</p>;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Hacker News Top Stories</h1>

        <div className="grid gap-5">
          {stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              user={user}
              onBookmark={handleBookmark}
              isBookmarked={bookmarks.includes(story._id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
