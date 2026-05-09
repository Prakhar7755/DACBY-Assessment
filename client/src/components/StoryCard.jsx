function StoryCard({ story, onBookmark, isBookmarked, user }) {
  return (
    <div className="border rounded-lg p-5">
      <a
        href={story.url}
        target="_blank"
        rel="noreferrer"
        className="text-xl font-semibold hover:underline"
      >
        {story.title}
      </a>

      <div className="mt-3 text-sm text-gray-600 space-y-1">
        <p>Points: {story.points}</p>

        <p>Author: {story.author}</p>

        <p>Posted: {story.postedAt}</p>
      </div>

      {user && (
        <button
          onClick={() => onBookmark(story._id)}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
        </button>
      )}
    </div>
  );
}

export default StoryCard;
