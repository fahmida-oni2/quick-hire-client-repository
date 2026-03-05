import React, { useState } from 'react';
import { Link } from 'react-router';
import Img from "../../../assets/Frame 3.png"
import { FaFacebookF, FaInstagram, FaGlobe, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    toast.success(`Subscribed with ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-[#202430] text-[#9199a8] pt-10 pb-6 px-5 sm:px-8 md:px-12 lg:px-20 font-epilogue">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10">

        <div className="col-span-2 sm:col-span-2 md:col-span-1 flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 no-underline w-fit">
            <div className="h-7 w-7 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
             <img src={Img} alt="QuickHire" />
            </div>
            <span className="text-white font-bold text-lg font-redhat">QuickHire</span>
          </Link>
          <p className="text-sm leading-relaxed font-epilogue max-w-[260px] sm:max-w-[300px] md:max-w-[200px]">
            Great platform for the job seeker that passionate about startups. Find your dream job easier.
          </p>
        </div>

        {/* About */}
        <div className="flex flex-col gap-1">
          <h4 className="text-white font-semibold  font-epilogue text-base mb-3">About</h4>
          <Link to="/companies" className="text-[#9199a8] hover:text-white text-sm py-1 transition-colors duration-200 no-underline">Companies</Link>
          <Link to="/pricing" className="text-[#9199a8] hover:text-white text-sm py-1 transition-colors duration-200 no-underline">Pricing</Link>
          <Link to="/terms" className="text-[#9199a8] hover:text-white text-sm py-1 transition-colors duration-200 no-underline">Terms</Link>
          <Link to="/advice" className="text-[#9199a8] hover:text-white text-sm py-1 transition-colors duration-200 no-underline">Advice</Link>
          <Link to="/privacy" className="text-[#9199a8] hover:text-white text-sm py-1 transition-colors duration-200 no-underline">Privacy Policy</Link>
        </div>

        {/* Resources */}
        <div className="flex flex-col  font-epilogue gap-1">
          <h4 className="text-white font-semibold text-base mb-3">Resources</h4>
          <Link to="/help" className="text-[#9199a8] hover:text-white text-sm py-1 transition-colors duration-200 no-underline">Help Docs</Link>
          <Link to="/guide" className="text-[#9199a8] hover:text-white text-sm py-1 transition-colors duration-200 no-underline">Guide</Link>
          <Link to="/updates" className="text-[#9199a8] hover:text-white text-sm py-1 transition-colors duration-200 no-underline">Updates</Link>
          <Link to="/contact" className="text-[#9199a8] hover:text-white text-sm py-1 transition-colors duration-200 no-underline">Contact Us</Link>
        </div>

        {/* Newsletter */}
        <div className="col-span-2 sm:col-span-2 md:col-span-1 flex flex-col gap-3">
          <h4 className="text-white font-semibold  font-epilogue text-base">Get job notifications</h4>
          <p className="text-sm leading-relaxed  font-epilogue">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <div className="flex flex-col lg:flex-row gap-2 mt-1">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 min-w-0 w-full bg-white border border-[#2e3a4e] rounded text-sm text-white placeholder-[#55607a] px-3 py-2 outline-none focus:border-indigo-500 transition-colors duration-200"
            />
            <button
              onClick={handleSubscribe}
              className="bg-indigo-600 hover:bg-indigo-700 w-30  font-epilogue text-white text-sm font-semibold px-3 sm:px-4 py-2 rounded transition-colors duration-200 whitespace-nowrap cursor-pointer shrink-0"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Social links */}
      <div className="border-t border-[#2e3a4e] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[#55607a] text-sm text-center sm:text-left">2021 @ QuickHire. All rights reserved.</p>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="#" target="_blank" rel="noreferrer" className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#252d3d] border border-[#2e3a4e] flex items-center justify-center text-[#9199a8] hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200"><FaFacebookF size={12} /></a>
          <a href="#" target="_blank" rel="noreferrer" className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#252d3d] border border-[#2e3a4e] flex items-center justify-center text-[#9199a8] hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200"><FaInstagram size={12} /></a>
          <a href="#" target="_blank" rel="noreferrer" className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#252d3d] border border-[#2e3a4e] flex items-center justify-center text-[#9199a8] hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200"><FaGlobe size={12} /></a>
          <a href="#" target="_blank" rel="noreferrer" className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#252d3d] border border-[#2e3a4e] flex items-center justify-center text-[#9199a8] hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200"><FaLinkedinIn size={12} /></a>
          <a href="#" target="_blank" rel="noreferrer" className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#252d3d] border border-[#2e3a4e] flex items-center justify-center text-[#9199a8] hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200"><FaTwitter size={12} /></a>
        </div>
      </div>

      <Toaster />
    </footer>
  );
};

export default Footer;