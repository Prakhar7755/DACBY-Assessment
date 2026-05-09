import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post('/auth/login', formData);

      login(data.user);

      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md border p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-5">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <button type="submit" disabled={loading} className="w-full bg-black text-white p-3 rounded">
          {loading ? 'Loading...' : 'Login'}
        </button>

        <p className="mt-4 text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
