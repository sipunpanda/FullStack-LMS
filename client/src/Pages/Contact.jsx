import { useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helpers/axiosInstance";
import HomeLayout from "../Layouts/HomeLayout";

function Contact() {
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            toast.error("Invalid Email");
            return;
        }

        try {
            const response = axiosInstance.post("/contact", userInput);
            toast.promise(response, {
                loading: "Submitting your message...",
                success: "Form submitted successfully",
                error: "Failed to submit the form",
            });
            const contactResponse = await response;
            if (contactResponse?.data?.success) {
                setUserInput({
                    name: "",
                    email: "",
                    message: "",
                });
            }
        } catch (err) {
            toast.error("Operation failed...");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-screen p-4">
                <form 
                    noValidate
                    onSubmit={onFormSubmit}
                    className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg text-white shadow-lg w-full max-w-md sm:p-8 md:p-10 lg:p-12">

                    <h1 className="text-2xl md:text-3xl font-semibold">Contact Form</h1>

                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="name" className="text-lg md:text-xl font-semibold">Name</label>
                        <input 
                            className="bg-transparent border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            onChange={handleInputChange}
                            value={userInput.name}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="email" className="text-lg md:text-xl font-semibold">Email</label>
                        <input 
                            className="bg-transparent border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleInputChange}
                            value={userInput.email}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="message" className="text-lg md:text-xl font-semibold">Message</label>
                        <textarea 
                            className="bg-transparent border px-3 py-2 rounded-md resize-none h-40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            id="message"
                            name="message"
                            placeholder="Enter your message"
                            onChange={handleInputChange}
                            value={userInput.message}
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 rounded-md py-3 font-semibold text-lg cursor-pointer"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Contact;
