import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { FiSearch, FiMapPin, FiChevronDown } from 'react-icons/fi';
import personImg from '../../assets/banner.png';
import Marquee from "react-fast-marquee";
import BASE_URL from '../../ApiBaseUrl/ApiBaseUrl';

const Banner = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [cities, setCities] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  //fetch locations 
  useEffect(() => {
    setLoadingCities(true);
    fetch(`${BASE_URL}/jobs`)
      .then(res => res.json())
      .then(data => {
        const uniqueLocations = [...new Set(data.map(job => job.location))];
        setCities(uniqueLocations);
        setLoadingCities(false);
      })
      .catch(() => setLoadingCities(false));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (title) params.set('title', title);
    if (location) params.set('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  const handleCitySelect = (city) => {
    setLocation(city);
    setDropdownOpen(false);
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <section className="font-epilogue bg-[#F8F8FD] overflow-hidden mt-15">

      {/* Hero */}
      <div className="relative min-h-[520px] lg:min-h-[560px] flex items-center">

        {/* Right background panel */}
        <div className="absolute top-0 right-0 h-full w-[55%] hidden lg:block" />

        {/* Person image */}
        <div className="absolute right-0 top-0 h-full w-[55%] hidden lg:flex items-end justify-center overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full mt-6 pointer-events-none"
            viewBox="0 0 600 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <rect x="200" y="30" width="320" height="380" rx="16" stroke="#d8dcf0" strokeWidth="1.5" />
            <rect x="240" y="65" width="250" height="300" rx="12" stroke="#dfe2f4" strokeWidth="1.2" />
            <rect x="280" y="100" width="180" height="220" rx="8" stroke="#e6e8f6" strokeWidth="1" />
            <rect x="155" y="5" width="390" height="440" rx="20" stroke="#d4d8ee" strokeWidth="1" />
          </svg>
          <img
            src={personImg}
            alt=""
            className="relative z-10 h-150 w-700 mt-350 pt-15 object-contain object-bottom"
          />
        </div>

        {/* Left Content */}
        <div className="relative z-20 mx-5 sm:mx-10 lg:mx-20 w-full lg:w-[65%] py-12 lg:py-0">
          <h1 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-black text-[#25324B] leading-tight mb-4">
            Discover <br /> more than <br />
            <span className="text-[#26A4FF] relative inline-block">
              5000+ Jobs
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 320 10" fill="none">
                <path d="M2 7C70 2 160 1 240 4C268 5.5 295 8 318 5" stroke="#4f46e5" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M260 9 L318 5 L308 2" stroke="#4f46e5" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </h1>

          <p className="text-[#515B6F] text-sm leading-relaxed mt-6 mb-8 max-w-xs font-epilogue">
            Great platform for the job seeker that searching for new career heights and passionate about startups.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="sm:flex items-stretch bg-white border border-gray-200 rounded-lg shadow-md w-full overflow-visible relative z-20"
          >
            {/* Title Input */}
            <div className="flex items-center gap-2 flex-1 px-4 py-3.5">
              <FiSearch className="shrink-0 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full text-sm outline-none text-dark placeholder-gray-300 bg-transparent"
              />
            </div>

            <div className="w-px bg-gray-100 shrink-0 my-3" />

            {/* Location Input + Dropdown */}
            <div className="relative flex-1" ref={dropdownRef}>
              <div className="w-full flex items-center gap-2 px-4 py-3.5 text-sm">
                <FiMapPin className="shrink-0 text-gray-400" size={15} />
                <input
                  type="text"
                  placeholder="Select location..."
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setDropdownOpen(true);
                  }}
                  onFocus={() => setDropdownOpen(true)}
                  className="flex-1 text-sm outline-none text-dark placeholder-gray-300 bg-transparent"
                />
                {location && (
                  <button
                    type="button"
                    onClick={() => {
                      setLocation('');
                      setDropdownOpen(false);
                    }}
                    className="text-gray-300 hover:text-gray-500 shrink-0"
                  >
                    ✕
                  </button>
                )}
                <FiChevronDown
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`text-gray-300 shrink-0 transition-transform duration-200 cursor-pointer ${dropdownOpen ? 'rotate-180' : ''}`}
                  size={14}
                />
              </div>

              {/* City Dropdown */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-52 overflow-y-auto">
                  {loadingCities ? (
                    <p className="text-xs text-gray-400 text-center py-4">
                      Loading locations...
                    </p>
                  ) : filteredCities.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-4">
                      No locations found
                    </p>
                  ) : (
                    filteredCities.map((city, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleCitySelect(city)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                      >
                        📍 {city}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-primary text-white text-sm font-epilogue font-bold px-8 py-3.5 w-full md:w-50 lg:w-50 hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap shrink-0 rounded-b-lg sm:rounded-b-none sm:rounded-r-lg"
            >
              Search my job
            </button>
          </form>

          {/* Popular */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-4 font-epilogue">
            <span className="text-xs text-gray-400">Popular :</span>
            <button

              className="text-xs text-gray-500 hover:text-primary transition-colors cursor-pointer"
            >
              UI Designer,
            </button>
            <button
              className="text-xs text-gray-500 hover:text-primary transition-colors cursor-pointer"
            >
              UX Researcher,
            </button>
            <button
              className="text-xs text-gray-500 hover:text-primary transition-colors cursor-pointer"
            >
              Android,
            </button>
            <button
              className="text-xs text-gray-500 hover:text-primary transition-colors cursor-pointer"
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Companies Marquee */}
      <div className="mt-4 lg:mt-0 border-t border-gray-100 font-epilogue pt-8 pb-6">
        <p className="text-xs text-gray-400 mx-5 sm:mx-10 lg:mx-20 mb-6">
          Companies we helped grow
        </p>
        <Marquee
          speed={50}
          gradient={true}
          gradientColor="#ffffff"
          gradientWidth={64}
          pauseOnHover={true}
        >
          <span className="text-[#202430] font-black text-base tracking-widest mx-16">VODAFONE</span>
          <span className="text-[#202430] font-black text-base tracking-widest mx-16">INTEL</span>
          <span className="text-[#202430] font-black text-base tracking-widest mx-16">TESLA</span>
          <span className="text-[#202430] font-black text-base tracking-widest mx-16">AMD</span>
          <span className="text-[#202430] font-black text-base tracking-widest mx-16">TALKIT</span>
        </Marquee>
      </div>

    </section>
  );
};

export default Banner;