import React from 'react';

const PostCard = ({ post }) => {
    return (
        <div>
            <h3>{post.username}</h3> {/* Display the username */}
            <img src={post.image_path} alt="Post"/> {/* Post image */}
            <p>{post.caption}</p> {/* Post caption */}
        </div>
    );
};

export default PostCard;
