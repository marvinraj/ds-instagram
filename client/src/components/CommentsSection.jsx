import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentsSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/comments/${postId}`);
            setComments(response.data);
        } catch (err) {
            console.error('Error fetching comments:', err);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        setIsSubmitting(true);
        try {
            const response = await axios.post(`http://localhost:5000/api/comments/${postId}`, {
                user_id: localStorage.getItem('user_id'),
                content: newComment,
            });
            setComments([
                ...comments,
                {
                    comment_id: response.data.commentId,
                    content: newComment,
                    username: localStorage.getItem('username'),
                },
            ]);
            setNewComment('');
        } catch (err) {
            console.error('Error adding comment:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <button
                onClick={() => {
                    setShowComments(!showComments);
                    if (!showComments) fetchComments();
                }}
                className="text-blue-500 text-sm"
            >
                {showComments ? 'Hide Comments' : 'View Comments'}
            </button>
            {showComments && (
                <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="flex-1 px-3 py-1 border rounded-lg"
                        />
                        <button
                            onClick={handleAddComment}
                            disabled={isSubmitting}
                            className="bg-blue-600 text-white px-4 py-1 rounded-lg"
                        >
                            {isSubmitting ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                    {comments.map((comment) => (
                        <div key={comment.comment_id} className="text-sm text-gray-700">
                            <strong>{comment.username}</strong>: {comment.content}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentsSection;
