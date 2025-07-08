import Button from "../components/Button"
import { Line, LineChart, ResponsiveContainer, XAxis } from 'recharts';


const data = [
    {
        name: 'Day 1',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Day 1',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Day 5',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Day 10',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Day 15',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Day 20',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Day 25',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const Dashboard = () => {
    return (
        <div className="max-w-9/12 mx-auto">
            <h1 className="font-black text-4xl my-4">Welcome back, Emily!</h1>
            <p className="text-slate-700 my-4">Day 12 of 30! Keep going!</p>

            <h3 className="my-4">The only way to do great work is to love what you do. - Steve Jobs</h3>

            {/* Challenge Progress */}

            {/* Progress  Chart */}
            <div className="border border-slate-300 rounded-md p-5 my-10">
                <div>
                    <h4 className="font-medium">Progress Over Time</h4>
                    <p className="font-black text-3xl my-2">40%</p>
                    <p className="text-slate-700 mb-4">Last 30 Days +10%</p>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart width={300} height={100} data={data}>
                        <XAxis dataKey="name" />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Streak */}
            <div className="border border-slate-300 rounded-md p-5 my-10">
                <h4 className="font-medium">Streak</h4>
                <p className="font-black text-3xl">12 days</p>
            </div>

            <div className="mb-10">
                <Button className="bg-blue-400 mx-2 rounded-md text-white cursor-pointer">Add Progress</Button>
            </div>

        </div>
    )
}

export default Dashboard


// I should learn about redux and state management