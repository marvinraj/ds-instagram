import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentsSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch comments for the post
    const fetchComments = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/comments/${postId}`);
            setComments(response.data);
        } catch (err) {
            console.error('Error fetching comments:', err);
        } finally {
            setLoading(false);
        }
    };

    // Toggle comment visibility and fetch comments if not already fetched
    const toggleComments = () => {
        if (showComments) {
            setShowComments(false);
        } else {
            fetchComments();
            setShowComments(true);
        }
    };

    // Handle adding a new comment
    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert('Comment cannot be empty!');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post(`http://localhost:5000/api/comments/${postId}`, {
                user_id: localStorage.getItem('user_id'), // Get user ID from local storage
                content: newComment,
            });

            // Add the new comment to the list without re-fetching
            setComments([...comments, { 
                comment_id: response.data.commentId,
                content: newComment,
                user_id: localStorage.getItem('user_id'),
                username: localStorage.getItem('username'), // Replace with actual username if available
            }]);
            setNewComment(''); // Clear the input
        } catch (err) {
            console.error('Error adding comment:', err);
            alert('Failed to add comment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="comments-section">
            <button className="toggle-comments-button" onClick={toggleComments}>
                {showComments ? 'Hide Comments' : 'View Comments'}
            </button>
            {showComments && (
                <div className="comments-container">
                    {/* Input for adding a comment */}
                    <div className="add-comment">
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                            className="add-comment-button"
                            onClick={handleAddComment}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                    {loading ? (
                        <p>Loading comments...</p>
                    ) : comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.comment_id} className="comment">
                                <strong>{comment.username}</strong>: {comment.content}
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CommentsSection;
