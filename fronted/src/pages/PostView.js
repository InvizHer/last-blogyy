import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostView() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${slug}`);
      setPost(response.data);
      
      // Update page title for SEO
      document.title = `${response.data.title} | Blog`;
      
      // Add meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', response.data.content.substring(0, 160));
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      {post.imageUrl && (
        <img
          src={`${process.env.REACT_APP_API_URL}${post.imageUrl}`}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-500 mb-4">
        {new Date(post.createdAt).toLocaleDateString()}
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map(tag => (
          <span
            key={tag}
            className="bg-gray-100 px-3 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}

export default PostView;
