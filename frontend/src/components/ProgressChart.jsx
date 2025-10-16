import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";

const ProgressChart = ({ progressPercent, formattedData }) => {
  console.log("formattedData", formattedData);

  return (
    <div className="flex">
      <div className="flex-1/4 border me-5 border-slate-300 rounded-md p-5 my-10 dark:text-white">
        <h4 className="font-medium">Overall Progress</h4>
      </div>
      <div className="border flex-1/2 border-slate-300 rounded-md p-5 my-10 dark:text-white">
        <div>
          <h4 className="font-medium">Progress Over Time</h4>
          <p className="font-black text-3xl my-2">{progressPercent}%</p>
          <p className="text-slate-700 mb-4 dark:text-white">
            Last 30 Days +10%
          </p>
        </div>
        {formattedData.length === 0 ? (
          <p>No Data Available!</p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart width={300} height={100} data={formattedData}>
              <XAxis
                dataKey="day"
                label={{ position: "insideBottom", offset: -5 }}
              />
              <Line
                type="monotone"
                dataKey="productivity"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }} // to show dots
                activeDot={{ r: 6 }} // bigger dot on hover
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                }}
                labelStyle={{ fontWeight: "bold" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ProgressChart;
