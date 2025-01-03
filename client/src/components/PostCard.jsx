import React from 'react';
import CommentsSection from '../components/CommentsSection';

const PostCard = ({ post }) => {
    return (
        <div className="post-card">
            <h3>{post.username}</h3> {/* Display username */}
            <img className='post-image' src={post.image_path} alt="Post"/> {/* Display image */}
            <p>{post.caption}</p> {/* Display caption */}
            {/* Embed the CommentsSection component */}
            <CommentsSection postId={post.post_id} />
        </div>
    );
};

export default PostCard;
