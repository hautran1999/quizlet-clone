import React from "react";
import SideBar from "../../components/SideBar";
import "./Home.scss";
const Home = () => {
  return (
    <div className="home-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
    </div>
  );
};

export default Home;
