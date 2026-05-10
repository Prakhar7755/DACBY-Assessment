import { useEffect, useState } from 'react';

import api from '../api/axios';

import Navbar from '../components/Navbar';
import StoryCard from '../components/StoryCard';

import { useAuth } from '../context/AuthContext';

function Bookmarks() {
  const { user, updateBookmarks } = useAuth();

  const [stories, setStories] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchStories = async () => {
      try {
        const { data } = await api.get('/stories');
        if (isMounted) {
          const bookmarkedStories = data.stories.filter((story) =>
            user?.bookmarks?.includes(story._id)
          );
          setStories(bookmarkedStories);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStories();
    return () => {
      isMounted = false;
    };
  }, [user?.bookmarks]);

  const handleBookmark = async (storyId) => {
    try {
      const token = user?.token || localStorage.getItem('token');
      const { data } = await api.post(
        `/stories/${storyId}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStories((prev) => prev.filter((story) => story._id !== storyId));
      updateBookmarks(data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl font-medium text-gray-500 animate-pulse">Loading your bookmarks...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Your <span className="text-orange-600 italic">Bookmarks</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">Stories you&apos;ve saved for later reading.</p>
        </header>

        <div className="space-y-6">
          {stories.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
              <p className="text-gray-500 text-lg">
                No bookmarks yet. Go back to home and save some stories!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
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
      </main>
    </div>
  );
}

export default Bookmarks;
