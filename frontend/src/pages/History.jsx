import useUserStore from "../store/userStore";

const History = () => {

    const { entries } = useUserStore();

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10">
            <h1 className="font-black text-4xl mb-6 text-gray-800">Past Logs</h1>
            <div className="flex flex-wrap gap-4">
                {entries.map((entry) => (
                    <div
                        key={entry.id}
                        className="flex-1 mx-auto min-w-[360px] max-w-sm bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition p-5 mb-3"
                    >
                        <h2 className="text-xl font-bold text-[#00ADB5] mb-1 truncate">{entry.title}</h2>
                        <p className="text-gray-700 mb-2 max-h-24 overflow-y-auto">{entry.description}</p>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                                {new Date(entry.date).toLocaleDateString()}
                            </span>
                            {/* Optionally, add tags here for category/mood/productivity */}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default History

// Here we are only showing the entries for current month