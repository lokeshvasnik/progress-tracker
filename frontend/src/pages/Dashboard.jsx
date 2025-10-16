import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Button from "../components/Button";
import Modal from "../components/Modal";
import ProgressChart from "../components/ProgressChart";
import StreakCard from "../components/StreakCard";
import Loader from "../components/Loader";

import useUserStore from "../store/userStore";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isPrevProgress, setIsPrevProgress] = useState(false);
  const [quoteData, setQuoteData] = useState(null);

  const { user, entries } = useUserStore();

  const totalChallengeDays = 30;
  const currentProgressData = entries?.length || 0;
  const progressPercent = Math.round(
    (currentProgressData / totalChallengeDays) * 100
  );

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

  const openTodayModal = () => {
    setIsPrevProgress(false);
    setModalOpen(true);
  };

  const openPrevModal = () => {
    setIsPrevProgress(true);
    setModalOpen(true);
  };

  // Format chart data
  const formattedData = entries?.map((entry) => ({
    ...entry,
    day: new Date(entry.date).getUTCDate(),
  }));

  if (!user || !entries) return <Loader />;

  const closeModalHandler = () => {
    setModalOpen(false);
  };
  return (
    <div className="max-w-[1200px] mx-auto p-6 mt-10 rounded-2xl bg-white dark:bg-[#272727]">
      <div className="flex ">
        <div className="flex-1/2">
          <h1 className="font-black text-4xl my-2 text-gray-800 dark:text-white">
            Welcome back, {user?.firstName?.toLowerCase()}! 🎉
          </h1>
          <p className="text-lg text-slate-600 dark:text-white my-2 font-medium">
            Day {new Date().getDate()} of 30! Keep going!
          </p>
        </div>

        <div className="flex-1/2 bg-[#ffc28546] px-5 rounded-md">
          {quoteData?.text && (
            <h3 className="my-4 italic text-sm text-black font-semibold">
              "{quoteData.text}"
              <span className="block text-sm text-gray-500 mt-1 dark:text-white">
                - {quoteData.author}
              </span>
            </h3>
          )}
        </div>
      </div>

      {/* Progress Section */}
      <div className="my-8">
        <ProgressChart
          formattedData={formattedData}
          progressPercent={progressPercent}
        />
      </div>

      {/* Streak Card */}
      <StreakCard currentProgressData={currentProgressData} />

      {/* Add Progress Button */}
      <div className="w-full flex justify-center my-8">
        <Button className="bg-[#00ADB5] hover:bg-[#09888e] transition rounded-lg text-white font-semibold px-8 py-2 mb-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:ring-offset-2" onClick={openTodayModal}>Add Progress</Button>

        <Button className="bg-[#00ADB5] ml-5 hover:bg-[#09888e] transition rounded-lg text-white font-semibold px-8 py-2 mb-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:ring-offset-2" onClick={openPrevModal}>Add Prev Progress</Button>
      </div>

      {/* Modal */}
      <Modal
        isPrevProgress={isPrevProgress}
        closeModalHandler={closeModalHandler}
        modalOpen={modalOpen}
        userUid={user?.uid}
        entriesData={entries}
        setModalOpen={setModalOpen}
      />
    </div>
  );
};

export default Dashboard;
