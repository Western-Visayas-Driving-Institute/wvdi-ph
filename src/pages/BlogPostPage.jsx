import React from 'react';
import { useParams } from 'react-router-dom';
import posts from '../data/blogPosts.json';
import ReactMarkdown from 'react-markdown';

const BlogPostPage = () => {
  const { id } = useParams();
  const post = posts.find(p => p.id === id);

  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500">{post.date}</p>
      <img src={post.cover} className="w-full my-4 rounded" alt={post.title} />
      <ReactMarkdown className="prose">{post.content}</ReactMarkdown>
    </div>
  );
};

export default BlogPostPage;
