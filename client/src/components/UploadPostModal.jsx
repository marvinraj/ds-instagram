import React, { useState } from 'react';
import axios from 'axios';

const UploadPostModal = ({ isOpen, onClose, onPostAdded }) => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Prevent rendering when modal is not open
    if (!isOpen) return null;

    // Handle file input change
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!caption.trim() || !image) {
            alert('Please provide an image and a caption!');
            return;
        }

        // Prepare form data for API call
        const formData = new FormData();
        formData.append('image', image);
        formData.append('caption', caption);
        formData.append('user_id', localStorage.getItem('user_id')); // Retrieve user_id from local storage

        try {
            setIsSubmitting(true);
            const response = await axios.post('http://localhost:5000/api/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Notify parent component about the new post
            alert('Post created successfully!');
            onPostAdded(response.data); // Call parent function to refresh posts
            onClose(); // Close the modal
        } catch (err) {
            console.error('Error creating post:', err);
            alert('Failed to create the post.');
        } finally {
            setIsSubmitting(false); // Reset the submitting state
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <button
                    className="text-red-500 text-2xl font-bold float-right"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
                <form onSubmit={handleSubmit}>
                    {/* File Input */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full mb-4 border rounded-lg p-2"
                        required
                    />

                    {/* Caption Input */}
                    <textarea
                        placeholder="Write a caption..."
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full mb-4 border rounded-lg p-2"
                        required
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Post'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadPostModal;
