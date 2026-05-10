function StoryCard({ story, onBookmark, isBookmarked, user }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <a
            href={story.url}
            target="_blank"
            rel="noreferrer"
            className="text-lg sm:text-xl font-bold text-gray-900 hover:text-orange-600 transition-colors leading-tight wrap-break-word"
          >
            {story.title}
          </a>

          <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-500">
            <span className="flex items-center gap-1 font-mono font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
              {story.points} points
            </span>
            <span className="flex items-center gap-1">
              by <span className="font-semibold text-gray-700">{story.author}</span>
            </span>
            <span className="flex items-center gap-1">{story.postedAt}</span>
          </div>
        </div>

        {user && (
          <button
            onClick={() => onBookmark(story._id)}
            className={`w-full sm:w-auto shrink-0 px-4 py-2 rounded-lg text-sm font-semibold text-center transition-all duration-200 ${
              isBookmarked
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-orange-600 text-white hover:bg-orange-700 shadow-sm'
            }`}
          >
            {isBookmarked ? 'Remove' : 'Bookmark'}
          </button>
        )}
      </div>
    </div>
  );
}

export default StoryCard;
