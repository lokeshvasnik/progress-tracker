import { useState, useEffect } from 'react';
import useThemeStore from '../store/themeStore';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-10 h-6 bg-gray-300 rounded-full relative transition-colors duration-200">
        <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform duration-200"></div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className={`w-10 h-6 rounded-full relative transition-colors duration-200 ${
        isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
      }`}
      aria-label="Toggle dark mode"
    >
      <div
        className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
          isDarkMode ? 'translate-x-4' : 'translate-x-0'
        }`}
      ></div>
      <span className="sr-only">
        {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;