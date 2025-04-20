import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Components/NavBar';
import SideBar from './Components/SideBar';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [loading, setPending] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [filter, setFilter] = useState('');

  const hashtagSuggestions = [
    'Announcement', 'Event', 'Question', 'General', 
    'Hostel', 'Mess', 'Academic', 'Social'
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        const response = await axios.get('/api/community-posts');
        setPosts(response.data || mockPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts(mockPosts);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      setPending(true);
      const hashtagArray = hashtags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
        .map(tag => tag.startsWith('#') ? tag : `#${tag}`);

      const newPostData = {
        content: newPost,
        hashtags: hashtagArray,
        author: {
          name: "Current User", 
          avatarURL: localStorage.getItem('avatarURL') || '../public/img/default-avatar.png'
        },
        timestamp: new Date().toISOString(),
        upvotes: 0,
        downvotes: 0,
        userVote: null
      };

      setPosts(prevPosts => [newPostData, ...prevPosts]);
      setNewPost('');
      setHashtags('');
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setPending(false);
    }
  };

  const handleVote = async (postId, voteType) => {
    try {
      setPosts(prevPosts => 
        prevPosts.map(post => {
          if (post.id === postId) {
            // If user already voted this way, remove the vote
            if (post.userVote === voteType) {
              return {
                ...post,
                upvotes: voteType === 'upvote' ? post.upvotes - 1 : post.upvotes,
                downvotes: voteType === 'downvote' ? post.downvotes - 1 : post.downvotes,
                userVote: null
              };
            } 
            // If user voted the opposite way, remove old vote and add new one
            else if (post.userVote !== null) {
              return {
                ...post,
                upvotes: voteType === 'upvote' ? post.upvotes + 1 : post.upvotes - (post.userVote === 'upvote' ? 1 : 0),
                downvotes: voteType === 'downvote' ? post.downvotes + 1 : post.downvotes - (post.userVote === 'downvote' ? 1 : 0),
                userVote: voteType
              };
            } 
            // If user hasn't voted yet
            else {
              return {
                ...post,
                upvotes: voteType === 'upvote' ? post.upvotes + 1 : post.upvotes,
                downvotes: voteType === 'downvote' ? post.downvotes + 1 : post.downvotes,
                userVote: voteType
              };
            }
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Error voting on post:", error);
    }
  };

  const filterPosts = () => {
    if (!filter) return posts;
    return posts.filter(post => 
      post.content.toLowerCase().includes(filter.toLowerCase()) ||
      post.hashtags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
    );
  };

  const mockPosts = [
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <SideBar />
      
      <div className="p-4 sm:ml-64 pt-20">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-white mb-6">Community Posts</h1>
          
          {/* Create post form */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6 shadow-lg border border-gray-700">
            <form onSubmit={handleSubmitPost}>
              <div className="mb-4">
                <textarea
                  className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="Share something with the community..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add hashtags separated by commas (e.g., event, question, announcement)"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {hashtagSuggestions.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="text-xs bg-gray-700 hover:bg-gray-600 text-blue-400 px-2 py-1 rounded-full"
                      onClick={() => {
                        const newTag = tag.startsWith('#') ? tag : `#${tag}`;
                        const currentTags = hashtags.split(',').map(t => t.trim()).filter(t => t);
                        if (!currentTags.includes(newTag)) {
                          setHashtags(prev => prev ? `${prev}, ${newTag}` : newTag);
                        }
                      }}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-150 flex items-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Posting...
                    </>
                  ) : (
                    "Post"
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Search and filter */}
          <div className="mb-6">
            <input
              type="text"
              className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search posts by content or hashtag..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          
          {/* Posts list */}
          <div className="space-y-6">
            {loadingPosts ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-gray-400">Loading posts...</p>
              </div>
            ) : filterPosts().length > 0 ? (
              filterPosts().map((post, index) => (
                <div key={post.id || index} className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700 transition-all duration-200 hover:shadow-xl">
                  <div className="flex items-start gap-3">
                    <img 
                      src={post.author.avatarURL} 
                      alt={post.author.name} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-white">{post.author.name}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(post.timestamp).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-300 mt-2 whitespace-pre-wrap">{post.content}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.hashtags.map((tag, i) => (
                          <span key={i} className="text-xs bg-gray-700 text-blue-400 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Updated Voting System to match image */}
                      <div className="flex items-center mt-4 space-x-6">
                        {/* Upvote button */}
                        <button 
                          className={`flex items-center gap-2 ${
                            post.userVote === 'upvote' ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
                          } transition-colors duration-200`}
                          onClick={() => handleVote(post.id, 'upvote')}
                        >
                          <svg 
                            className="w-5 h-5" 
                            fill={post.userVote === 'upvote' ? "currentColor" : "none"} 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                          <span>{post.upvotes}</span>
                          <span className="ml-1">Upvote</span>
                        </button>
                        
                        {/* Downvote button */}
                        <button 
                          className={`flex items-center gap-2 ${
                            post.userVote === 'downvote' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                          } transition-colors duration-200`}
                          onClick={() => handleVote(post.id, 'downvote')}
                        >
                          <svg 
                            className="w-5 h-5" 
                            fill={post.userVote === 'downvote' ? "currentColor" : "none"} 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                          <span>{post.downvotes}</span>
                          <span className="ml-1">Downvote</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-gray-800 rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
                <p className="mt-2 text-gray-400">No posts found. Be the first to post something!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;