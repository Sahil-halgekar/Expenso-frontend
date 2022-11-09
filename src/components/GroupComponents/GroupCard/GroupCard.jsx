import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './GroupCard.css';

const GroupCard = ({ groupId, title, category}) => {
  const navigate = useNavigate();

  const handleGroupCardClick = async () => {
      navigate(`/groups/${groupId}`);
 
  };
  return (
    <div className="group-card" onClick={handleGroupCardClick}>
      <h3>{title}</h3>
      <p>{category}</p>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default GroupCard;
