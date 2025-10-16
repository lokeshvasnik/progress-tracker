const StreakCard = ({ currentProgressData }) => {
  return (
    <div className="flex space-x-5">
      <div className="border flex-1/4 border-slate-300 space-y-2 rounded-md p-5">
        <h4 className="font-medium dark:text-white">Streak</h4>
        <p className="font-black text-3xl dark:text-white">
          {currentProgressData} <span className="text-base">days</span>
        </p>
        <p className="text-sm">Keep the good work</p>
      </div>
      <div className="border flex-1/4 border-slate-300 space-y-2 rounded-md p-5">
        <h4 className="font-medium dark:text-white">Streak</h4>
        <p className="font-black text-3xl dark:text-white">
          {currentProgressData} <span className="text-base">days</span>
        </p>
        <p className="text-sm">Keep the good work</p>
      </div>
      <div className="border flex-1/4 border-slate-300 space-y-2 rounded-md p-5">
        <h4 className="font-medium dark:text-white">Streak</h4>
        <p className="font-black text-3xl dark:text-white">
          {currentProgressData} <span className="text-base">days</span>
        </p>
        <p className="text-sm">Keep the good work</p>
      </div>
      <div className="border flex-1/4 border-slate-300 space-y-2 rounded-md p-5">
        <h4 className="font-medium dark:text-white">Streak</h4>
        <p className="font-black text-3xl dark:text-white">
          {currentProgressData} <span className="text-base">days</span>
        </p>
        <p className="text-sm">Keep the good work</p>
      </div>
    </div>
  );
};

export default StreakCard;
