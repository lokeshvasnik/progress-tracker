import { useState } from "react"
import Button from "./Button"

const API_URL = "https://crudcrud.com/api/a6d79d4fd6024834b9f14670fa683783";


const Modal = ({ closeModalHandler, modalOpen, userUid }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [mood, setMood] = useState('');
    const [productivityLevel, setProductivityLevel] = useState('');

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setCategory("");
        setMood("");
        setProductivityLevel("");
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        const progressData = {
            title,
            description,
            category,
            mood,
            productivity: Number(productivityLevel),
            // date: new Date().toISOString(),
            uid: userUid, 
        };

        try {
            const response = await fetch(`http://localhost:5000/api/entries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(progressData),
            });

            if (!response.ok) throw new Error("Failed to submit");

            alert("Progress submitted! 🎉");
            resetForm();
            closeModalHandler();
        } catch (err) {
            alert("Error submitting progress.");
            console.error(err);
        }
    };


    return (
        <div className={`fixed top-0 right-0 w-[600px] overflow-auto h-screen bg-white p-8 shadow-lg bg-opacity-50 z-40 ${modalOpen ? 'block' : 'hidden'}`}>
            <h1 className="font-black text-4xl my-4">Welcome back, Emily!</h1>

            <form className="space-y-4" onSubmit={formSubmitHandler}>
                <div>
                    <label htmlFor="title" className="block font-medium mb-1">Today's Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="What did you learn?"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block font-medium mb-1">Description</label>
                    <textarea
                        id="description"
                        placeholder="Write a detailed description..."
                        className="w-full border border-gray-300 p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block font-medium mb-1">Category</label>
                    <select
                        id="category"
                        name="category"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    >
                        <option value="">Select category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="react">React</option>
                        <option value="dsa">DSA</option>
                        <option value="project">Project</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="mood" className="block font-medium mb-1">Mood</label>
                    <select
                        id="mood"
                        name="mood"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setMood(e.target.value)}
                        value={mood}
                    >
                        <option value="">How do you feel?</option>
                        <option value="happy">😄 Happy</option>
                        <option value="ok">😐 Okay</option>
                        <option value="sad">😞 Tired</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="productivity" className="block font-medium mb-1">Productivity</label>
                    <select
                        id="productivity"
                        name="productivity"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setProductivityLevel(e.target.value)}
                        value={productivityLevel}
                    >
                        <option value="">Rate your productivity</option>
                        <option value="1">😴 1 - Lazy</option>
                        <option value="5">😐 5 - Average</option>
                        <option value="10">🚀 10 - Super productive</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 bg-[#00acb5ef] text-white py-2 rounded hover:bg-[#00ADB5] transition"
                >
                    Submit Progress
                </button>
            </form>

            <Button
                onClick={closeModalHandler}
                className={`bg-[#393e46e6] hover:bg-[#393e46] text-white px-4 py-2 rounded-md mt-5`}
            >
                Cancel
            </Button>
        </div>
    )
}

export default Modal