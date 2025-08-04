import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from "./Button"
import * as yup from 'yup';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
    mood: yup.string().required("Mood is required"),
    productivity: yup.string().required("Productivity level is required").min(1, "Must be at least 1").max(10, "Must be at most 10"),
});

const Modal = ({ closeModalHandler, modalOpen, userUid, entriesData }) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });


    const formSubmitHandler = async (data) => {

        const hasEntryForToday = entriesData?.some(entry => {
            const entryDate = new Date(entry.date).toDateString();
            const today = new Date().toDateString();
            return entryDate === today && entry.uid === userUid;
        });

        if (hasEntryForToday) {
            toast.error("You've already submitted an entry for today. 🛑");
            reset();
            return;
        }
        const progressData = {
            uid: userUid,
            ...data
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/entries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(progressData),
            });

            if (!response.ok) throw new Error("Failed to submit");

            alert("Progress submitted! 🎉");
            reset();
            closeModalHandler();
        } catch (err) {
            alert("Error submitting progress.");
            console.error(err);
        }
    };


    return (
        <div className={`fixed top-0 right-0 w-full max-w-xl h-screen overflow-auto bg-white p-8 shadow-2xl z-40 transition-all duration-300 ${modalOpen ? 'block' : 'hidden'}`}>
            <h1 className="font-black text-3xl md:text-4xl my-4 text-gray-800">
                Dump Your Progress Here...
            </h1>

            <form className="space-y-5" onSubmit={handleSubmit(formSubmitHandler)}>

                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Today's Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="What did you learn?"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition"
                        {...register("title")}
                    />
                    {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                    <textarea
                        id="description"
                        placeholder="Write a detailed description..."
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] resize-none transition"
                        rows={4}
                        {...register("description")}
                    />
                    {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
                </div>

                {/* Category */}
                <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <select
                        id="category"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition"
                        {...register("category")}
                    >
                        <option value="">Select category</option>
                        <option value="personal">Personal Project</option>
                        <option value="learning">Learning</option>
                        <option value="dsa">DSA</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
                </div>

                {/* Mood */}
                <div>
                    <label htmlFor="mood" className="block text-sm font-semibold text-gray-700 mb-1">Mood</label>
                    <select
                        id="mood"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition"
                        {...register("mood")}
                    >
                        <option value="">How do you feel?</option>
                        <option value="happy">😄 Happy</option>
                        <option value="ok">😐 Okay</option>
                        <option value="sad">😞 Tired</option>
                    </select>
                    {errors.mood && <p className="text-xs text-red-500 mt-1">{errors.mood.message}</p>}
                </div>

                {/* Productivity */}
                <div>
                    <label htmlFor="productivity" className="block text-sm font-semibold text-gray-700 mb-1">Productivity</label>
                    <select
                        id="productivity"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition"
                        {...register("productivity")}
                    >
                        <option value="">Rate your productivity</option>
                        <option value="1">😴 1 - Lazy</option>
                        <option value="5">😐 5 - Average</option>
                        <option value="10">🚀 10 - Super productive</option>
                    </select>
                    {errors.productivity && <p className="text-xs text-red-500 mt-1">{errors.productivity.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full mt-6 bg-[#00ADB5] hover:bg-[#02939b] transition text-white font-semibold py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:ring-offset-2"
                >
                    Submit Progress
                </button>
            </form>

            {/* Cancel Button */}
            <button
                onClick={closeModalHandler}
                className="w-full mt-4 bg-[#393e46] hover:bg-[#242628] transition text-white font-medium py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#393E46] focus:ring-offset-2"
                type="button"
            >
                Cancel
            </button>
        </div>

    )

};




export default Modal