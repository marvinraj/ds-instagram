import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Likes = ({ postId }) => {
    const [likesCount, setLikesCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        // Fetch likes count and like status on mount
        const fetchLikesData = async () => {
            try {
                // Fetch likes count
                const likesResponse = await axios.get(`http://localhost:5000/api/posts/${postId}/likes-count`);
                setLikesCount(likesResponse.data.likes_count);

                // Check if the user has liked this post
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

    const toggleLike = async () => {
        try {
            if (hasLiked) {
                // Unlike the post
                await axios.delete(`http://localhost:5000/api/posts/${postId}/unlike`, {
                    data: { user_id: localStorage.getItem('user_id') },
                });
                setLikesCount((prev) => prev - 1);
                setHasLiked(false);
            } else {
                // Like the post
                await axios.post(`http://localhost:5000/api/posts/${postId}/like`, {
                    user_id: localStorage.getItem('user_id'),
                });
                setLikesCount((prev) => prev + 1);
                setHasLiked(true);
            }
        } catch (err) {
            console.error('Error toggling like:', err);
        }
    };

    return (
        <div className="likes">
            <button
                className={`like-button ${hasLiked ? 'liked' : ''}`}
                onClick={toggleLike}
            >
                {hasLiked ? 'Unlike' : 'Like'}
            </button>
            <span>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
        </div>
    );
};

export default Likes;
