import React from 'react';
import BlogPostCard from './BlogPostCard';

const BlogList = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {posts.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">No posts found.</div>
      ) : (
        posts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
};

export default BlogList;
