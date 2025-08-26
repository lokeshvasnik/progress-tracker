const StreakCard = ({currentProgressData}) => {
    return (
        <div className="border border-slate-300 rounded-md p-5 my-10">
            <h4 className="font-medium dark:text-white">Streak</h4>
            <p className="font-black text-3xl dark:text-white">{currentProgressData} days</p>
        </div>
    )
}

export default StreakCard