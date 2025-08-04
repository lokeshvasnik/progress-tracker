import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Button from "../components/Button";
import Modal from "../components/Modal";
import ProgressChart from "../components/ProgressChart";
import StreakCard from "../components/StreakCard";
import Loader from "../components/Loader";

import useUserStore from "../store/userStore";

const Dashboard = () => {
  const [modalOpen, setIsModalOpen] = useState(false);
  const [quoteData, setQuoteData] = useState(null);

  const { user, entries } = useUserStore();

  console.log('Entries:', entries);

  const totalChallengeDays = 30;
  const currentProgressData = entries?.length || 0;
  const progressPercent = Math.round((currentProgressData / totalChallengeDays) * 100);

  // Quote API
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_QUOTE_API_KEY}`);
        const quote = await response.json();
        setQuoteData(quote);
      } catch (error) {
        console.error("Failed to fetch quote:", error);
      }
    };
    fetchQuote();
  }, []);

  // Format chart data
  const formattedData = entries?.map((entry) => ({
    ...entry,
    day: new Date(entry.date).getUTCDate(),
  }));

  const closeModalHandler = () => setIsModalOpen(false);

  if (!user || !entries) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 rounded-2xl bg-white">
      <h1 className="font-black text-4xl my-2 text-gray-800">
        Welcome back, {user?.firstName?.toLowerCase()}! 🎉
      </h1>
      <p className="text-lg text-slate-600 my-2 font-medium">
        Day {new Date().getDate()} of 30! Keep going!
      </p>

      {quoteData?.text && (
        <h3 className="my-4 italic text-base text-[#00adb5] font-semibold">
          "{quoteData.text}"
          <span className="block text-sm text-gray-500 mt-1">- {quoteData.author}</span>
        </h3>
      )}

      {/* Progress Section */}
      <div className="my-8">
        <ProgressChart
          formattedData={formattedData}
          progressPercent={progressPercent}
        />
      </div>

      {/* Streak Card */}
      <div className="my-6">
        <StreakCard currentProgressData={currentProgressData} />
      </div>

      {/* Add Progress Button */}
      <div className="w-full flex justify-center my-8">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#00ADB5] hover:bg-[#09888e] transition rounded-lg text-white font-semibold px-8 py-2 mb-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:ring-offset-2"
        >
          Add Progress
        </Button>
      </div>

      {/* Modal */}
      <Modal
        closeModalHandler={closeModalHandler}
        modalOpen={modalOpen}
        userUid={user?.uid}
        entriesData={entries}
      />
    </div>

  );
};

export default Dashboard;
