import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../components/firebase"
;
import Button from "../components/Button"
import Modal from "../components/Modal";
import toast from "react-hot-toast";

import ProgressChart from "../components/ProgressChart";
import StreakCard from "../components/StreakCard";
import Loader from "../components/Loader";

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

    // Fetch user data from Firestore
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

    // Fetch quote data
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

    // Fetch entries data
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

    if (!entriesData) return <Loader/>;

    const formattedData = entriesData?.map((entry,index) => ({
        ...entry,
        day: new Date(entry.date).getUTCDate(),
    }));

    return (
        <div className="max-w-9/12 mx-auto">
            <h1 className="font-black text-4xl my-4">Welcome back, {userDetails?.firstName.toLowerCase()}! 🎉</h1>
            <p className="text-slate-700 my-4">Day {new Date().getDate()} of 30! Keep going!</p>

            <h3 className="my-4">{quoteData?.text} - {quoteData?.author}</h3>

            {/* Progress  Chart */}
            <ProgressChart formattedData={formattedData} progressPercent={progressPercent}/>

            <StreakCard currentProgressData={currentProgressData} />

            <Button onClick={() => setIsModalOpen(true)} className="bg-[#00ADB5] rounded-md mb-10 text-white cursor-pointer">Add Progress</Button>

            <Modal closeModalHandler={closeModalHandler} modalOpen={modalOpen} userUid={userDetails?.uid} entriesData={entriesData} />
        </div>
    )
}

export default Dashboard
