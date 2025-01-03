import React from 'react';

const PostCard = ({ post }) => {
    return (
        <div className="post-card">
            <h3>{post.username}</h3> {/* Display username */}
            <img className='post-image' src={post.image_path} alt="Post"/> {/* Display image */}
            <p>{post.caption}</p> {/* Display caption */}
        </div>
    );
};

export default PostCard;
