import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FiArrowRight } from 'react-icons/fi';
import { RiPenNibLine, RiBarChartLine, RiBroadcastLine, RiMoneyDollarCircleLine, RiComputerLine, RiCodeSSlashLine, RiBriefcaseLine, RiGroupLine } from 'react-icons/ri';
import BASE_URL from '../../ApiBaseUrl/ApiBaseUrl';

const categoryConfig = [
  { icon: <RiPenNibLine size={28} />, name: 'Design' },
  { icon: <RiBarChartLine size={28} />, name: 'Sales' },
  { icon: <RiBroadcastLine size={28} />, name: 'Marketing' },
  { icon: <RiMoneyDollarCircleLine size={28} />, name: 'Finance' },
  { icon: <RiComputerLine size={28} />, name: 'Technology' },
  { icon: <RiCodeSSlashLine size={28} />, name: 'Engineering' },
  { icon: <RiBriefcaseLine size={28} />, name: 'Business' },
  { icon: <RiGroupLine size={28} />, name: 'Human Resources' },
];

const CategoryList = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [categories, setCategories] = useState(
    categoryConfig.map((c) => ({ ...c, jobs: 0 }))
  );

  // Fetch all jobs 
  useEffect(() => {
    fetch(`${BASE_URL}/jobs`)
      .then((res) => res.json())
      .then((jobs) => {
        const updated = categoryConfig.map((cat) => ({
          ...cat,
          jobs: jobs.filter((job) => job.category === cat.name).length,
        }));
        setCategories(updated);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="mx-5 sm:mx-10 lg:mx-20 my-16 font-epilogue">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-clash text-2xl sm:text-3xl font-black text-[#25324B]">
          Explore by <span className="text-[#26A4FF]">category</span>
        </h2>
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2 text-sm text-[#4640DE] font-semibold hover:underline cursor-pointer"
        >
          Show all jobs <FiArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, index) => {
          const isActive = hovered === index;
          return (
            <button
              key={index}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(`/jobs?category=${cat.name}`)}
              className={`flex sm:flex-col flex-row items-center sm:items-start text-left p-4 sm:p-6 rounded-md border transition-all duration-200 cursor-pointer group gap-4 sm:gap-0 ${
                isActive
                  ? 'bg-primary border-primary'
                  : 'bg-white border-gray-200 hover:border-primary'
              }`}
            >
              <div className={`shrink-0 ${isActive ? 'text-white' : 'text-primary'}`}>
                {cat.icon}
              </div>
              <div className="sm:mt-4">
                <p className={`font-bold text-sm sm:text-base mb-0.5 sm:mb-1 ${isActive ? 'text-white' : 'text-[#25324B]'}`}>
                  {cat.name}
                </p>
                <div className={`flex justify-between items-center text-xs sm:text-sm ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                  <div>{cat.jobs} jobs available</div>
                  <div>
                    <FiArrowRight size={12} className={`transition-transform group-hover:translate-x-1 ${isActive ? 'text-white' : 'text-primary'}`} />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

    </section>
  );
};

export default CategoryList;