import React, { useState } from 'react';

const SubmitForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        title: '',
        body: ''
    });
    const URL="https://abdullah-khan-mumbailore-module-submit.onrender.com"

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validate = () => {
        const newErrors = {};
        const { name, email, title, body } = formData;

        if (!name.trim()) newErrors.name = "Name is required.";
        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format.";

        if (!title.trim()) newErrors.title = "Title is required.";
        else if (title.length > 80) newErrors.title = "Title must be under 80 characters.";

        if (!body.trim()) newErrors.body = "Body is required.";
        else if (body.length < 50) newErrors.body = "Body must be at least 50 characters.";
        else if (body.length > 1000) newErrors.body = "Body must be under 1000 characters.";

        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            const res = await fetch(`${URL}/api/submit-lore`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                setSuccessMessage("✅ Thank you—your story is under review.");
                setFormData({
                    name: '',
                    email: '',
                    title: '',
                    body: ''
                });
            }
        } catch (error) {
            console.error("Submission failed", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4 py-10 sm:px-6 lg:px-8">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-6 sm:p-8 shadow-xl rounded-xl space-y-6 border border-gray-200"
            >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
                    Submit Your Story
                </h2>

                {successMessage && (
                    <p className="bg-green-100 border border-green-400 text-green-700 p-4 rounded-lg text-sm sm:text-base">
                        {successMessage}
                    </p>
                )}

                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

               
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Story Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        maxLength={80}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

               
                <div>
                    <label className="block text-sm font-medium text-gray-700">Your Story</label>
                    <textarea
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                        rows={6}
                        minLength={50}
                        maxLength={1000}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                    />
                    {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-[#E91E63] text-white w-full py-3 rounded-md font-semibold hover:bg-pink-600 transition duration-300"
                >
                    Submit Story
                </button>
            </form>
        </div>
    );
};

export default SubmitForm;
