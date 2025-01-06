import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import UploadPostModal from '../components/UploadPostModal';

const FeedPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handlePostAdded = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts');
            setPosts(response.data);
        } catch (err) {
            console.error('Error fetching posts after new post:', err);
        }
    };

    return (
        <section className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                {/* Create Post Button */}
                <div className="flex justify-center mb-6">
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Create Post
                    </button>
                </div>

                {/* Modal for Creating a Post */}
                <UploadPostModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onPostAdded={handlePostAdded}
                />

                {/* Posts */}
                <div className="flex flex-col items-center space-y-6">
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
    );
};

export default FeedPage;
