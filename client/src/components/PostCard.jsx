import React from 'react';
import CommentsSection from '../components/CommentsSection';
import Likes from '../components/Likes';

const PostCard = ({ post }) => {
    return (
        <div className="post-card">
            <h3>{post.username}</h3> {/* Display username */}
            <img className='post-image' src={post.image_path} alt="Post"/> {/* Display image */}
            <p>{post.caption}</p> {/* Display caption */}
            <Likes postId={post.post_id} />
            <CommentsSection postId={post.post_id} />
        </div>
    );
};

export default PostCard;
