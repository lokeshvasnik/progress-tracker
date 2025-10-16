import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import useUserStore from "../store/userStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const schema = yup.object().shape({
  category: yup.string().required("Category is required"),
  title: yup.string().when("category", {
    is: (val) => val !== "other",
    then: (schema) => schema.required("Title is required"),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  description: yup.string().when("category", {
    is: (val) => val !== "other",
    then: (schema) => schema.required("Description is required"),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  mood: yup.string().when("category", {
    is: (val) => val !== "other",
    then: (schema) => schema.required("Mood is required"),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  productivity: yup.string().when("category", {
    is: (val) => val !== "other",
    then: (schema) =>
      schema
        .required("Productivity level is required")
        .min(1, "Must be at least 1")
        .max(10, "Must be at most 10"),
    otherwise: (schema) => schema.optional().nullable(),
  }),
});

const Modal = ({
  setModalOpen,
  modalOpen,
  userUid,
  entriesData,
  isPrevProgress,
}) => {
  const { user } = useUserStore();
  const [date, setDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const categoryWatch = watch("category");
  const closeModalHandler = () => {
    setModalOpen(false);
  };
  // Send email logic
  const sendEmail = async (formData) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        {
          from_name: "Daily Progress App",
          from_email: "no-reply@progress.com",
          to_email: user.email,
          cc_email: `${
            user.email === "lokeshvasnik2003@gmail.com"
              ? import.meta.env.VITE_EMAIL_CC_EMAIL
              : ""
          }`,
          message: `
                Title: ${formData.title}
                Description: ${
                  formData.description === ""
                    ? "Week Off"
                    : formData.description
                }
                Category: ${formData.category}
                Mood: ${formData.mood}
                Productivity: ${formData.productivity}
                UID: ${formData.uid}
              `,
          uid: formData.uid,
        },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      );

      toast.success("Email sent successfully!");
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Error in sending mail");
    }
  };

  const formSubmitHandler = async (data) => {
    console.log("data", data);
    // ✅ If category = "other", clear other fields
    if (data.category === "other") {
      data = {
        ...data,
        title: "",
        description: "",
        mood: "",
        productivity: "",
      };
    }

    // ✅ Prevent duplicate entries only for today
    if (!isPrevProgress) {
      const hasEntryForToday = entriesData?.some((entry) => {
        const entryDate = new Date(entry.date).toDateString();
        const today = new Date().toDateString();
        return entryDate === today && entry.uid === userUid;
      });

      if (hasEntryForToday) {
        toast.error("You've already submitted an entry for today. 🛑");
        reset();
        return;
      }
    }

    const progressData = {
      uid: userUid,
      date: isPrevProgress ? date : new Date(),
      ...data,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/entries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(progressData),
        }
      );

      if (!response.ok) throw new Error("Failed to submit");

      alert("Progress submitted! 🎉");
      sendEmail(progressData);
      reset();
      closeModalHandler();
    } catch (err) {
      alert("Error submitting progress.");
      console.error(err);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-full max-w-xl h-screen overflow-auto bg-white p-8 shadow-2xl z-40 transition-all duration-300 ${
        modalOpen ? "block" : "hidden"
      }`}
    >
      <h1 className="font-black text-3xl md:text-4xl my-4 text-gray-800">
        Dump Your Prev Progress Here...
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit(formSubmitHandler)}>
        {/* Title */}

        {isPrevProgress && (
          <div>
            <DatePicker
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] resize-none transition"
              placeholderText="Select Date"
              selected={date}
              onChange={(d) => setDate(d)}
            />
          </div>
        )}

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Today's Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="What did you learn?"
            readOnly={categoryWatch === "other"} // ✅ readOnly instead of disabled
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Write a detailed description..."
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] resize-none transition"
            readOnly={categoryWatch === "other"}
            rows={4}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Category
          </label>
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
          {errors.category && (
            <p className="text-xs text-red-500 mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Mood */}
        <div>
          <label
            htmlFor="mood"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Mood
          </label>
          <select
            id="mood"
            readOnly={categoryWatch === "other"}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition"
            {...register("mood")}
          >
            <option value="">How do you feel?</option>
            <option value="happy">😄 Happy</option>
            <option value="ok">😐 Okay</option>
            <option value="sad">😞 Tired</option>
          </select>
          {errors.mood && (
            <p className="text-xs text-red-500 mt-1">{errors.mood.message}</p>
          )}
        </div>

        {/* Productivity */}
        <div>
          <label
            htmlFor="productivity"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Productivity
          </label>
          <select
            id="productivity"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition"
            readOnly={categoryWatch === "other"}
            {...register("productivity")}
          >
            <option value="">Rate your productivity</option>
            <option value="1">😴 1 - Lazy</option>
            <option value="5">😐 5 - Average</option>
            <option value="10">🚀 10 - Super productive</option>
          </select>
          {errors.productivity && (
            <p className="text-xs text-red-500 mt-1">
              {errors.productivity.message}
            </p>
          )}
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
  );
};

export default Modal;
