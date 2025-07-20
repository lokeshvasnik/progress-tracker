import useUserStore from "../store/userStore";

const History = () => {

    const { entries } = useUserStore();

    return (
        <div className="max-w-9/12 mx-auto">
            <h1 className="font-black text-4xl my-4">Past Logs</h1>
            <div className="flex flex-wrap gap-1.5">
                {
                    entries.map((entry) => (
                        <div key={entry.id} className="border p-4 my-2 rounded-lg">
                            <h2 className="text-2xl font-bold">{entry.title}</h2>
                            <p className="text-gray-700">{entry.description}</p>
                            <p className="text-sm text-gray-500">Date: {new Date(entry.date).toLocaleDateString()}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default History

// Here we are only showing the entries for current month