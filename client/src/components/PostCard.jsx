import React from 'react';
import CommentsSection from '../components/CommentsSection';
import Likes from '../components/Likes';

const PostCard = ({ post }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md">
            {/* Username */}
            <h3 className="font-semibold text-lg text-gray-800 mb-2">{post.username}</h3>

            {/* Image */}
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={post.image_path}
                    alt="Post"
                />
            </div>

            {/* Caption */}
            <p className="text-gray-700 mt-4">{post.caption}</p>

            {/* Likes */}
            <Likes postId={post.post_id} />

            {/* Comments Section */}
            <CommentsSection postId={post.post_id} />
        </div>
    );
};

export default PostCard;
