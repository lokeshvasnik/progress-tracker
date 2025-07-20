const plans = [
  {
    name: "Starter",
    price: "Free",
    desc: "Track your daily progress and enjoy motivational features at no cost.",
    features: [
      "Basic progress tracking",
      "Access to dashboard & logs",
      "Daily motivational quotes",
      "Community access",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹299/mo",
    desc: "Unlock advanced analytics and customization for serious learners.",
    features: [
      "All Starter features",
      "Advanced statistics & charts",
      "Personalized reminders",
      "Priority support",
      "Widget customization",
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Ultimate",
    price: "₹799/mo",
    desc: "All tools unlocked. The best for accountability and growth.",
    features: [
      "All Pro features",
      "Progress export (CSV/PDF)",
      "Team collaboration",
      "Beta features access",
      "1-on-1 onboarding",
    ],
    cta: "Go Ultimate",
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-black text-center text-[#00ADB5] mb-2">Pricing</h1>
      <p className="text-lg text-gray-600 text-center mb-10 max-w-xl mx-auto">
        Flexible plans for lifelong learners and productivity hackers. Pick the plan that fits your journey!
      </p>
      <div className="grid gap-8 md:grid-cols-3">

        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col bg-white rounded-2xl shadow-lg p-8 border transition
              ${plan.highlight ? "border-[#00ADB5] shadow-2xl scale-105 z-10" : "border-gray-200"}`
            }
          >
            {plan.highlight && (
              <span className="absolute top-4 right-4 bg-[#00ADB5] text-white text-xs font-bold px-3 py-1 rounded-md shadow">
                Most Popular
              </span>
            )}
            <div className="mb-2">
              <span className="text-lg font-bold text-[#00ADB5]">{plan.name}</span>
            </div>
            <div className="mb-4 text-4xl font-extrabold text-gray-900">
              {plan.price}
            </div>
            <p className="mb-6 text-gray-600">{plan.desc}</p>
            <ul className="mb-6 space-y-2 text-sm text-gray-700">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="mr-2 text-[#00ADB5]">✔</span> {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full text-center py-2 rounded-lg font-semibold transition
                ${plan.highlight
                  ? "bg-[#00ADB5] text-white hover:bg-[#00949B]"
                  : "border border-[#00ADB5] text-[#00ADB5] hover:bg-[#f2fafe]"}`
              }
            >
              {plan.cta}
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};


export default Pricing;
