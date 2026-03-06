import React from 'react';
import { useNavigate } from 'react-router';
import dashboardImg from '../../assets/dashboard.png';

const DashboardPromo = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-5 sm:mx-10 lg:mx-20 my-16 font-epilogue">
     <div
  className="bg-primary overflow-hidden flex flex-col lg:flex-row items-center justify-between px-8 sm:px-14 py-12 gap-10"
  style={{
    clipPath: 'polygon(150px 0%, 100% 0%, 100% calc(100% - 150px), calc(100% - 150px) 100%, 0% 100%, 0% 100px)',
    
  }}
>
        {/* Left Text */}
        <div className="max-w-sm">
          <h2 className="font-clash text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            Start posting <br /> jobs today
          </h2>
          <p className="text-white/70 font-epilogue text-sm mb-8">
            Start posting jobs for only $10.
          </p>
          <button
            onClick={() => navigate('/auth/register')}
            className="bg-white text-primary  font-epilogue font-bold text-sm px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Sign Up For Free
          </button>
        </div>

        {/* Right Dashboard Image */}
        <div className="relative w-full lg:w-auto flex justify-center lg:justify-end">
          <div className="relative">
          
            <div className="absolute -inset-4 bg-white/10 rounded-2xl blur-xl" />
            <img
              src={dashboardImg}
              alt="Dashboard Preview"
              className="relative rounded-xl shadow-2xl w-200  object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default DashboardPromo;