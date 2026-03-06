import React from 'react';
import Banner from '../../Components/Banner/Banner';
import CategoryList from '../../Components/CategoryList/CategoryList';
import FeaturedJobs from '../../Components/FeaturedJobs/FeaturedJobs';
import LatestJob from '../../Components/LatestJob/LatestJob';
import DashboardPromo from '../../Components/DashboardPromo/DashboardPromo';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <CategoryList></CategoryList>
            <DashboardPromo></DashboardPromo>
            <FeaturedJobs></FeaturedJobs>
            <LatestJob></LatestJob>
        </div>
    );
};

export default Home;