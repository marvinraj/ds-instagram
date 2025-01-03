import Navbar from '../components/Navbar'
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Directly use axios for API calls
import PostCard from '../components/PostCard'; // Component for displaying a single post

const FeedPage = () => {

    const [posts, setPosts] = useState([]); // State to store posts
    const [loading, setLoading] = useState(true); // State to manage loading

    // Fetch posts from the backend
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts');
                setPosts(response.data);
            } catch (err) {
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return <p>Loading posts...</p>;
    }
    if (posts.length === 0) {
        return <p>No posts to display.</p>;
    }

    return (
        <section>
            <Navbar/>
            <div className="feed">
                <h1>Feed</h1>
                {posts.map((post) => (
                    <PostCard key={post.post_id} post={post} />
                ))}
            </div>
        </section>
    )
}

export default FeedPage