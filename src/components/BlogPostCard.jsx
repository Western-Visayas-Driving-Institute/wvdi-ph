import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded shadow p-4 bg-white hover:shadow-lg transition">
      <img src={post.cover} alt={post.title} className="object-cover rounded blog-image" style={{ width: '40%', height: 'auto', display: 'block', margin: '0 auto' }} />
      <h2 className="text-xl font-bold mt-2">{post.title}</h2>
      <p className="text-sm text-gray-600 mb-2">{post.date}</p>
      <p className="text-xs text-gray-500 mb-1 font-semibold">{post.category}</p>
      {expanded ? (
        <div className="prose prose-sm max-w-none mt-2" style={{ whiteSpace: 'pre-line' }}>
          {post.content}
        </div>
      ) : (
        <p>{post.excerpt}</p>
      )}
      <button
        className="text-blue-500 mt-2 inline-block font-medium hover:underline"
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
        aria-label={expanded ? `Collapse full article for ${post.title}` : `Read more about ${post.title}`}
      >
        {expanded ? 'Show Less' : 'Read More'}
      </button>
    </div>
  );
};

export default BlogPostCard;
