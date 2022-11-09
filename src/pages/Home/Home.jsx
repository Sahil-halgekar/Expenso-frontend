import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import home from "./home.png";
import { getUserInfo } from "../../api/userInfo";
function Home() {
  const navigate = useNavigate();
  const handleGroups = () => {
    navigate("/groups");
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  const [userInfo, setUserInfo] = useState(undefined);
  useEffect(() => {
    const getData = async () => {
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
    };
    getData();
  }, []);
  return (
    <>
      <div className="card">
        <div className="cardBody">
          <img className="cardImage" src={home} alt="img" />
          <div className="content">
            <h2 className="cardTitle">
              Hello {userInfo?.firstName} welcome back!!!
            </h2>
            <h3 className="cardDescription">
              Keep track of your shared expenses and settle your corresponding
              balances in a convinient and personalized way
            </h3>
            <button onClick={handleGroups} className="card_button">
              View Groups
            </button>
          </div>
        </div>
      </div>
      <div className="card2">
      <div className="cardBody">
        <div className="content2">
          <h2 className="cardTitle2">Hello {userInfo?.firstName} welcome back!!!</h2>
          <h3 className="cardDescription2">
              Here are some instructions that will help you to use this app effictively.<br/><br/>
              1. First you have to create a group by navigating to my groups page and clicking on the plus sign.<br/><br/>
              2. Next you have to add members, where you will have to add first name, last name and email of the person you want to add to group. Even if the person is not registered on the app you can still add his/her email. <br/> <br/>
              3. Next you can add expenses and split them equally or manually. You can check in balances who owes whom and how much. On settled you can mark it as paid.
          </h3>
        </div>
      </div>
    </div>
    <div className="card3">
      <div className="cardBody">
        <div className="content3">
          <h3 className="cardDescription3">
            To update your password you can update it in the Profile page.
          </h3>
          <button onClick={handleProfile} className="card_button3">View Profile</button>
          
        </div>
        <img className="cardImage3" src={home} alt="img" />
      </div>
    </div>
    </>
  );
}

export default Home;
