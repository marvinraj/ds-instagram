import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Likes = ({ postId }) => {
    const [likesCount, setLikesCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    // Fetch likes count and user's like status on component mount
    useEffect(() => {
        const fetchLikesData = async () => {
            try {
                // Fetch likes count
                const likesResponse = await axios.get(`http://localhost:5000/api/posts/${postId}/likes-count`);
                setLikesCount(likesResponse.data.likes_count);

                // Fetch user's like status
                const likeStatusResponse = await axios.post(`http://localhost:5000/api/posts/${postId}/check`, {
                    user_id: localStorage.getItem('user_id'),
                });
                setHasLiked(likeStatusResponse.data.liked);
            } catch (err) {
                console.error('Error fetching likes data:', err);
            }
        };

        fetchLikesData();
    }, [postId]);

    // Toggle like/unlike functionality
    const toggleLike = async () => {
        try {
            const userId = localStorage.getItem('user_id'); // Get user ID from local storage

            if (hasLiked) {
                // Unlike the post
                await axios.delete(`http://localhost:5000/api/posts/${postId}/unlike`, {
                    data: { user_id: userId },
                });
                setLikesCount((prev) => prev - 1);
                setHasLiked(false);
            } else {
                // Like the post
                await axios.post(`http://localhost:5000/api/posts/${postId}/like`, {
                    user_id: userId,
                });
                setLikesCount((prev) => prev + 1);
                setHasLiked(true);
            }
        } catch (err) {
            console.error('Error toggling like:', err);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            {/* Like/Unlike Button */}
            <button
                className={`text-sm font-medium px-3 py-1 rounded-lg ${
                    hasLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
                onClick={toggleLike}
            >
                {hasLiked ? 'Unlike' : 'Like'}
            </button>
            {/* Likes Count */}
            <span className="text-gray-600">{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
        </div>
    );
};

export default Likes;
