import { useState } from "react";
import toast from "react-hot-toast";

const faqs = [
  {
    q: "How do I reset my password?",
    a: "Go to the login page, click 'Forgot Password' and follow the instructions sent to your email.",
  },
  {
    q: "How can I upgrade my plan?",
    a: "Visit the Pricing page and select your new plan. The upgrade will apply instantly.",
  },
  {
    q: "Who can I contact for urgent help?",
    a: "Fill out the contact form below or email us directly at support@codeup.app.",
  },
];

const Support = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    toast.success("Your message has been sent! We'll get back to you soon.");
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-black text-[#00ADB5] mb-2 text-center">Support</h1>
      <p className="text-lg text-gray-600 text-center mb-8 max-w-xl mx-auto">
        Need help or have questions? Our team is here for you! Check our quick FAQs or send us a direct message below.
      </p>

      {/* FAQs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Frequently Asked Questions</h2>
        <ul className="space-y-5">
          {faqs.map((faq, i) => (
            <li key={i} className="bg-white border border-gray-200 rounded-lg px-6 py-4 shadow">
              <div className="font-semibold text-[#00ADB5] mb-1">{faq.q}</div>
              <div className="text-gray-700">{faq.a}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Form */}
      <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Contact Support</h2>
        {submitted ? (
          <div className="text-green-600 font-semibold my-4">
            Thanks for reaching out! We’ll be in touch soon.
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Your Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition"
                placeholder="you@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Your Message</label>
              <textarea
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] resize-none transition"
                rows={4}
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              className="bg-[#00ADB5] hover:bg-[#00949B] text-white font-semibold rounded-lg px-6 py-2 transition shadow focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:ring-offset-2"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Support;
