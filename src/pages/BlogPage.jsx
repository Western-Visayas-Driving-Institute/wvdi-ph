import React, { useState, useEffect } from 'react';
import BlogList from '../components/BlogList';
import { Link, useLocation } from 'react-router-dom';
import wvdiLogo from '../assets/WVDI-logo.png';
import posts from '../data/blogPosts.json';

const BlogPage = () => {
  const [search, setSearch] = useState('');
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    post.content.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="wvdi-root">
      <header className="wvdi-header">
        <img src={wvdiLogo} className="wvdi-logo" alt="WVDI Logo" />
        <div className="wvdi-header-text">
          <h1>Western Visayas Driving Institute</h1>
          <h2>Driving Institute</h2>
          <p className="wvdi-contact">(034) 435-5803</p>
          <p className="wvdi-hours">Office Hours: Mondays to Sundays, 8:00 AM to 6:00 PM</p>
        </div>
      </header>
      <nav className="wvdi-nav" style={{display: 'flex', alignItems: 'center', gap: '2rem', justifyContent: 'center', padding: '1rem 0'}}>
        <div style={{display: 'flex', alignItems: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{flex: '0 0 auto'}}>
            <Link to="/" className="wvdi-nav-link">Home</Link>
          </div>
          <div style={{flex: '0 0 auto', marginLeft: '2rem'}}>
            <Link
              to="/?scroll=services"
              className="wvdi-nav-link"
              onClick={e => {
                // Let routing happen, then scroll on the main page
              }}
            >
              Services
            </Link>
          </div>
          <div style={{flex: 1}}></div>
          <form onSubmit={e => e.preventDefault()} style={{display: 'flex', alignItems: 'center', marginRight: '1.5rem'}}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search blog posts..."
              className="wvdi-nav-link"
              style={{fontSize: '1.1rem', padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', maxWidth: 250, background: 'var(--wvdi-white)', color: 'var(--wvdi-navy)', fontFamily: 'inherit'}}
              aria-label="Search blog posts"
            />
          </form>
        </div>
      </nav>
      <div style={{width: '100%', maxWidth: '1200px', margin: '0 auto'}}>
        <main className="py-10 px-4">
          <h1 className="text-3xl font-bold mb-6">WVDI Blog</h1>
          <BlogList posts={filteredPosts} />
          <div className="mt-8">
            <Link to="/" className="text-blue-600 underline">&larr; Back to Main Page</Link>
          </div>
        </main>
      </div>
    </div>
  );
};

const MainPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const scrollTarget = searchParams.get('scroll');

  useEffect(() => {
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [scrollTarget]);

  // ... rest of the MainPage component
};

export default BlogPage;
