import React, { useState } from 'react';
import axios from 'axios';

const UploadPostModal = ({ isOpen, onClose, onPostAdded }) => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null; // Don't render the modal if it's not open

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!caption || !image) {
            alert('Please provide an image and a caption!');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('caption', caption);
        formData.append('user_id', localStorage.getItem('user_id')); // Fetch user_id from local storage

        try {
            setIsSubmitting(true);
            const response = await axios.post('http://localhost:5000/api/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Post created successfully!');
            onPostAdded(response.data); // Notify parent component about the new post
            onClose(); // Close the modal
        } catch (err) {
            console.error('Error creating post:', err);
            alert('Failed to create the post.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>Create a New Post</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    <textarea
                        placeholder="Write a caption..."
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Post'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadPostModal;
