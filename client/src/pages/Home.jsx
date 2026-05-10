import { useEffect, useState } from 'react';

import api from '../api/axios';

import Navbar from '../components/Navbar';
import StoryCard from '../components/StoryCard';

import { useAuth } from '../context/AuthContext';

function Home() {
  const { user, updateBookmarks } = useAuth();

  const [stories, setStories] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data } = await api.get('/stories');

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

    fetchStories();
  }, [user]);

  const handleBookmark = async (storyId) => {
    try {
      const token = user?.token || localStorage.getItem('token');
      const { data } = await api.post(
        `/stories/${storyId}/bookmark`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setBookmarks(data.bookmarks);

      updateBookmarks(data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl font-medium text-gray-500 animate-pulse">Loading top stories...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Hacker News <span className="text-orange-600 italic">Top Stories</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            The most popular stories currently trending on Y Combinator.
          </p>
        </header>

        <div className="space-y-6">
          {stories.length > 0 ? (
            stories.map((story) => (
              <StoryCard
                key={story._id}
                story={story}
                user={user}
                onBookmark={handleBookmark}
                isBookmarked={bookmarks.includes(story._id)}
              />
            ))
          ) : (
            <p className="text-center py-20 text-gray-500 italic">
              No stories found. Try scraping again.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
