import { useEffect, useState } from "react";
import Button from "../components/Button"
import { Line, LineChart, ResponsiveContainer, XAxis } from 'recharts';
import Modal from "../components/Modal";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";

const data = [
    {
        name: 'Day 1',
        category: 'JavaScript',
        mood: 'happy',
        productivity: 7,
        description: 'Learned about array methods.',
    },
    {
        name: 'Day 2',
        category: 'DSA',
        mood: 'ok',
        productivity: 6,
        description: 'Solved 3 medium-level problems.',
    },
    {
        name: 'Day 3',
        category: 'React',
        mood: 'sad',
        productivity: 4,
        description: 'Struggled with useEffect and dependencies.',
    },
    {
        name: 'Day 4',
        category: 'Project',
        mood: 'happy',
        productivity: 9,
        description: 'Built authentication flow with JWT.',
    },
    {
        name: 'Day 5',
        category: 'JavaScript',
        mood: 'ok',
        productivity: 5,
        description: 'Practiced ES6 concepts like destructuring.',
    },
    {
        name: 'Day 6',
        category: 'React',
        mood: 'happy',
        productivity: 8,
        description: 'Created reusable button and card components.',
    },
    {
        name: 'Day 7',
        category: 'DSA',
        mood: 'ok',
        productivity: 6,
        description: 'Solved 2 binary tree problems.',
    },
    {
        name: 'Day 8',
        category: 'Project',
        mood: 'happy',
        productivity: 9,
        description: 'Finished dashboard layout and responsiveness.',
    },
    {
        name: 'Day 9',
        category: 'JavaScript',
        mood: 'sad',
        productivity: 4,
        description: 'Felt stuck on closures and scope chain.',
    },
    {
        name: 'Day 10',
        category: 'React',
        mood: 'happy',
        productivity: 10,
        description: 'Integrated chart library and added dynamic data.',
    },
    {
        name: 'Day 11',
        category: 'JavaScript',
        mood: 'happy',
        productivity: 7,
        description: 'Learned about array methods.',
    },
    {
        name: 'Day 12',
        category: 'DSA',
        mood: 'ok',
        productivity: 6,
        description: 'Solved 3 medium-level problems.',
    },
    {
        name: 'Day 13',
        category: 'React',
        mood: 'sad',
        productivity: 4,
        description: 'Struggled with useEffect and dependencies.',
    },
    // {
    //     name: 'Day 14',
    //     category: 'Project',
    //     mood: 'happy',
    //     productivity: 9,
    //     description: 'Built authentication flow with JWT.',
    // },
    // {
    //     name: 'Day 15',
    //     category: 'JavaScript',
    //     mood: 'ok',
    //     productivity: 5,
    //     description: 'Practiced ES6 concepts like destructuring.',
    // },
    // {
    //     name: 'Day 16',
    //     category: 'React',
    //     mood: 'happy',
    //     productivity: 8,
    //     description: 'Created reusable button and card components.',
    // },
    // {
    //     name: 'Day 17',
    //     category: 'DSA',
    //     mood: 'ok',
    //     productivity: 6,
    //     description: 'Solved 2 binary tree problems.',
    // },

];



const Dashboard = () => {
    const [modalOpen, setIsModalOpen] = useState(false)
    const [userDetails, setUserDetails] = useState(null);

    const closeModalHandler = () => {
        setIsModalOpen(false)
    };

    const totalChallengeDays = 30;
    const currentProgressData = data.length;

    const progressPercent = Math.round((currentProgressData / totalChallengeDays) * 100);

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log("User is logged in:", user);

                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                    console.log("User details:", docSnap.data());
                } else {
                    console.log("No user data found in Firestore.");
                }
            } else {
                console.log("User is not logged in.");
            }
        });

    };

    useEffect(() => {
        fetchUserData();
    }, []);

    console.log('userDetails',userDetails)

    return (
        <div className="max-w-9/12 mx-auto">
            <h1 className="font-black text-4xl my-4">Welcome back, {userDetails?.firstName.toLowerCase()}! 🎉</h1>
            <p className="text-slate-700 my-4">Day 12 of 30! Keep going!</p>

            <h3 className="my-4">The only way to do great work is to love what you do. - Steve Jobs</h3>

            {/* Challenge Progress */}

            {/* Progress  Chart */}
            <div className="border border-slate-300 rounded-md p-5 my-10">
                <div>
                    <h4 className="font-medium">Progress Over Time</h4>
                    <p className="font-black text-3xl my-2">{progressPercent}%</p>
                    <p className="text-slate-700 mb-4">Last 30 Days +10%</p>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart width={300} height={100} data={data}>
                        <XAxis dataKey="name" />
                        <Line type="monotone" dataKey="productivity" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Streak */}
            <div className="border border-slate-300 rounded-md p-5 my-10">
                <h4 className="font-medium">Streak</h4>
                <p className="font-black text-3xl">{currentProgressData} days</p>
            </div>

            <div className="mb-10">
                <Button onClick={() => setIsModalOpen(true)} className="bg-[#00ADB5] mx-2 rounded-md text-white cursor-pointer">Add Progress</Button>
            </div>

            <Modal closeModalHandler={closeModalHandler} modalOpen={modalOpen} />

        </div>
    )
}

export default Dashboard


// I should learn about redux and state management