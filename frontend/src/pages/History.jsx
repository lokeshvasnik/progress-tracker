const History = () => {
    // Here we will show the past logs of the user ( current month data only )
    return (
        <div className="max-w-9/12 mx-auto">
            <h1 className="font-black text-4xl my-4">Past Logs</h1>

            <div className='border border-slate-300 rounded-md p-5 my-10'>
                <p className='text-slate-700'>May Month Stats</p>
            </div>

            <div className='border border-slate-300 rounded-md p-5 my-10'>
                <p className='text-slate-700'>June Month Stats</p>
            </div>

            <div className='border border-slate-300 rounded-md p-5 my-10'>
                <p className='text-slate-700'>July Month Stats</p>
            </div>
        </div>
    )
}

export default History