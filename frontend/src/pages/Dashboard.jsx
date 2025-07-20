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
    <div className="max-w-9/12 mx-auto">
      <h1 className="font-black text-4xl my-4">
        Welcome back, {user?.firstName?.toLowerCase()}! 🎉
      </h1>
      <p className="text-slate-700 my-4">
        Day {new Date().getDate()} of 30! Keep going!
      </p>

      {quoteData?.text && (
        <h3 className="my-4">
          {quoteData.text} - {quoteData.author}
        </h3>
      )}

      <ProgressChart
        formattedData={formattedData}
        progressPercent={progressPercent}
      />

      <StreakCard currentProgressData={currentProgressData} />

      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#00ADB5] rounded-md mb-10 text-white cursor-pointer"
      >
        Add Progress
      </Button>

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
