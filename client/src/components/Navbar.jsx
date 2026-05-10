import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-2">
          <div className="bg-orange-600 text-white w-8 h-8 flex items-center justify-center rounded font-bold text-lg shadow-sm group-hover:bg-orange-700 transition-colors">
            Y
          </div>
          <span className="text-xl font-serif font-bold text-gray-900 tracking-tight">
            HN <span className="text-orange-600">Stories</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/bookmarks"
                className="text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors"
              >
                Bookmarks
              </Link>

              <button
                onClick={logout}
                className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
