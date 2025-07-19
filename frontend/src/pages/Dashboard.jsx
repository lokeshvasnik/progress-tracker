import { useEffect, useState } from "react";
import Button from "../components/Button"
import { Line, LineChart, ResponsiveContainer, XAxis } from 'recharts';
import Modal from "../components/Modal";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const Dashboard = () => {
    const [modalOpen, setIsModalOpen] = useState(null)
    const [userDetails, setUserDetails] = useState(null);
    const [quoteData, setQuoteData] = useState(null);
    const [entriesData, setEntriesData] = useState();

    const closeModalHandler = () => {
        setIsModalOpen(false)
    };

    const totalChallengeDays = 30;
    const currentProgressData = entriesData?.length;

    const progressPercent = Math.round((currentProgressData / totalChallengeDays) * 100);

    useEffect(() => {
        const fetchUserData = async () => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserDetails(docSnap.data());
                    } else {
                        toast.error("No user data found in Firestore.");
                    }
                } else {
                    toast.error("User is not logged in.");
                }
            });

            // Optional: Return unsubscribe for cleanup
            return unsubscribe;
        };

        fetchUserData();
    }, []);

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

    useEffect(() => {
        const fetchEntryData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/entries/${userDetails?.uid}`);


                if (!response.ok) throw new Error("Failed to fetch entries");
                const entries = await response.json();
                setEntriesData(entries);
            } catch (error) {
                toast.error("Error fetching entries:", error);
            }
        }

        if (userDetails?.uid) {
            fetchEntryData();
        }
    }, [userDetails?.uid])
    
    if (!entriesData) return <p>Loading your progress...</p>


    return (
        <div className="max-w-9/12 mx-auto">
            <h1 className="font-black text-4xl my-4">Welcome back, {userDetails?.firstName.toLowerCase()}! 🎉</h1>
            <p className="text-slate-700 my-4">Day {new Date().getDate()} of 30! Keep going!</p>

            <h3 className="my-4">{quoteData?.text} - {quoteData?.author}</h3>

            {/* Challenge Progress */}

            {/* Progress  Chart */}
            <div className="border border-slate-300 rounded-md p-5 my-10">
                <div>
                    <h4 className="font-medium">Progress Over Time</h4>
                    <p className="font-black text-3xl my-2">{progressPercent}%</p>
                    <p className="text-slate-700 mb-4">Last 30 Days +10%</p>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart width={300} height={100} data={entriesData}>
                        <XAxis label={{ value: entriesData?.date?.toLocaleDateString(), position: "insideBottom" }}  />
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

            <Modal closeModalHandler={closeModalHandler} modalOpen={modalOpen} userUid={userDetails?.uid}/>

        </div>
    )
}

export default Dashboard


// I should learn about redux and state management