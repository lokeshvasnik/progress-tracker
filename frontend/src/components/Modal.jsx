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
        <div className={`fixed top-0 right-0 w-[600px] overflow-auto h-screen bg-white p-8 shadow-lg bg-opacity-50 z-40 ${modalOpen ? 'block' : 'hidden'}`}>
            <h1 className="font-black text-4xl my-4">Dumb Your Progress Here...</h1>

            <form className="space-y-4" onSubmit={handleSubmit(formSubmitHandler)}>
                <div>
                    <label htmlFor="title" className="block font-medium mb-1">Today's Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="What did you learn?"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("title")}
                    />
                    {errors.title && <p className="text-red-500 my-1">{errors.title.message}</p>}
                </div>

                <div>
                    <label htmlFor="description" className="block font-medium mb-1">Description</label>
                    <textarea
                        id="description"
                        placeholder="Write a detailed description..."
                        className="w-full border border-gray-300 p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("description")}
                    />
                    {errors.description && <p className="text-red-500 my-1">{errors.description.message}</p>}
                </div>

                <div>
                    <label htmlFor="category" className="block font-medium mb-1">Category</label>
                    <select
                        id="category"
                        name="category"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("category")}
                    >
                        <option value="">Select category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="react">React</option>
                        <option value="dsa">DSA</option>
                        <option value="project">Project</option>
                    </select>
                    {errors.category && <p className="text-red-500 my-1">{errors.category.message}</p>}
                </div>

                <div>
                    <label htmlFor="mood" className="block font-medium mb-1">Mood</label>
                    <select
                        id="mood"
                        name="mood"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("mood")}
                    >
                        <option value="">How do you feel?</option>
                        <option value="happy">😄 Happy</option>
                        <option value="ok">😐 Okay</option>
                        <option value="sad">😞 Tired</option>
                    </select>
                    {errors.mood && <p className="text-red-500 my-1">{errors.mood.message}</p>}
                </div>

                <div>
                    <label htmlFor="productivity" className="block font-medium mb-1">Productivity</label>
                    <select
                        id="productivity"
                        name="productivity"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("productivity")}
                    >
                        <option value="">Rate your productivity</option>
                        <option value="1">😴 1 - Lazy</option>
                        <option value="5">😐 5 - Average</option>
                        <option value="10">🚀 10 - Super productive</option>
                    </select>
                    {errors.productivity && <p className="text-red-500 my-1">{errors.productivity.message}</p>}
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

};




export default Modal