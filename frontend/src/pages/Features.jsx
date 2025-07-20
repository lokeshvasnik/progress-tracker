const features = [
  {
    title: "Progress Tracking",
    desc: "Monitor your learning journey, set goals, and visualize improvement with insightful charts.",
    icon: (
      // Example SVG icon (Bar chart)
      <svg className="w-8 h-8 text-[#00ADB5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="3" y="13" width="4" height="8" rx="1" />
        <rect x="9" y="9" width="4" height="12" rx="1" />
        <rect x="15" y="5" width="4" height="16" rx="1" />
      </svg>
    ),
  },
  {
    title: "Daily Logging & Motivation",
    desc: "Log your daily accomplishments, moods, and productivity. Get motivational quotes and keep your streak going.",
    icon: (
      // Example SVG icon (Clipboard)
      <svg className="w-8 h-8 text-[#00ADB5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M9 2h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Customizable Dashboard",
    desc: "Personalize your dashboard widgets and appearance. Switch between light and dark mode anytime.",
    icon: (
      // Example SVG icon (Cog/settings)
      <svg className="w-8 h-8 text-[#00ADB5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 8.6 15a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0 .33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 15 8.6a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 15z" />
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-black text-center text-[#00ADB5] mb-2">Features</h1>
      <p className="text-gray-600 text-center mb-10 text-lg max-w-2xl mx-auto">
        Everything you need to track progress, stay motivated, and build lasting habits.
      </p>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition"
          >
            <div className="mb-4">{f.icon}</div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">{f.title}</h2>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
