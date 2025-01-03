import Navbar from '../components/Navbar'
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Directly use axios for API calls
import PostCard from '../components/PostCard'; // Component for displaying a single post
import UploadPostModal from '../components/UploadPostModal';

const FeedPage = () => {

    const [posts, setPosts] = useState([]); // State to store posts
    const [loading, setLoading] = useState(true); // State to manage loading
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handlePostAdded = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts');
            setPosts(response.data); // Replace the posts state with the updated list
        } catch (err) {
            console.error('Error fetching posts after new post:', err);
        }
    };

    return (
        <section>
            <Navbar/>
            <div className="feed-page">
                <h1>Feed</h1>
                <button className="create-post-button" onClick={() => setIsModalOpen(true)}>
                    Create Post
                </button>
                <UploadPostModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onPostAdded={handlePostAdded}
                />
                <div className="posts-container">
                    {loading ? (
                        <p>Loading posts...</p>
                    ) : posts.length > 0 ? (
                        posts.map((post) => <PostCard key={post.post_id} post={post} />)
                    ) : (
                        <p>No posts to display.</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default FeedPage;