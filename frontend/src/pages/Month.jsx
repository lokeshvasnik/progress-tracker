import { useEffect, useState } from 'react';
import useUserStore from "../store/userStore";
import ProgressChart from '../components/ProgressChart';
import Loader from '../components/Loader';

const Month = () => {
  const { user } = useUserStore();
  const [month, setMonth] = useState('06'); 
  const [loading, setLoading] = useState(true);
  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
    if (!user?.uid || !month) return;

    setLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/entries/${user.uid}?month=${month}&year=2025`)
      .then((res) => res.json())
      .then((data) => {
        setMonthData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching entries:", err);
        setLoading(false);
      });
  }, [user?.uid, month]);

  if (loading) return <Loader />;

    // Format chart data
  const formattedData = monthData?.map((entry) => ({
    ...entry,
    day: new Date(entry.date).getUTCDate(),
  }));

  const totalChallengeDays = 30;
  const currentProgressData = monthData?.length || 0;
  const progressPercent = Math.round((currentProgressData / totalChallengeDays) * 100);



  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-black text-4xl my-4">Past Logs</h1>

      <select
        className="border p-2 rounded"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        <option value="06">June</option>
        <option value="07">July</option>
      </select>

      <div className=' border-slate-300 rounded-md p-5 my-10'>
        <ProgressChart formattedData={formattedData} progressPercent={progressPercent} />
      </div>
    </div>
  );
};

export default Month;
