import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";
import { Chart as ChartJS, ArcElement, Legend, Tooltip as ChartTooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Legend, ChartTooltip);

const ProgressChart = ({ progressPercent, formattedData }) => {
  const data = {
    labels: formattedData?.map((item) => item.day) || [],
    datasets: [
      {
        label: "Productivity",
        data: formattedData?.map((item) => item.productivity) || [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom", // 'top' | 'bottom' | 'left' | 'right'
        labels: {
          color: "#333", // legend text color
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-col md:flex-row gap-5">
      {/* Doughnut Chart */}
      <div className="basis-1/4 border border-slate-300 rounded-md p-5 my-10 dark:text-white">
        <h4 className="font-medium mb-4">Overall Progress</h4>
        <div className="h-64"> {/* keep fixed height */}
          <Doughnut data={data} options={options} />
        </div>
      </div>

      {/* Line Chart */}
      <div className="basis-11/12 border border-slate-300 rounded-md p-5 my-10 dark:text-white">
        <h4 className="font-medium">Progress Over Time</h4>
        <p className="font-black text-3xl my-2">{progressPercent}%</p>
        <p className="text-slate-700 mb-4 dark:text-white">Last 30 Days +10%</p>

        {formattedData.length === 0 ? (
          <p>No Data Available!</p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={formattedData}>
              <XAxis dataKey="day" />
              <Line
                type="monotone"
                dataKey="productivity"
                stroke="#152733"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc" }}
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
