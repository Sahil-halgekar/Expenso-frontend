import React, { useEffect, useState } from 'react';
import SplitByShares from '../../utils/splitByShares';
import SharesInputsItem from '../SharesInputsItem/SharesInputsItem';
import './SharesInputs.css';

const SharesInputs = ({ members, expense_amount, setShares, currency }) => {
  const [sharesByMember, setSharesByMember] = useState([]);
  const [amountsByMember, setAmountsByMember] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [splitMethod, setSplitMethod] = useState('equally');

  useEffect(() => {
    const sharesByMember = members.map(() => 1);
    const amountsByMember = members.map(() => 0);
    const selectedMembers = members.map(() => true);
    setSharesByMember(sharesByMember);
    setSelectedMembers(selectedMembers);
    setAmountsByMember(amountsByMember);
  }, [members]);

  useEffect(() => {
    if (sharesByMember.length > 0) {
      const amountsByMember = SplitByShares(2, expense_amount, sharesByMember);
      setAmountsByMember(amountsByMember);
    }
  }, [expense_amount, sharesByMember]);

  useEffect(() => {
    if (amountsByMember.length > 0) {
      const shares = members.map((member, index) => ({
        shared_with: member._id,
        share_amount: amountsByMember[index],
      }));
      setShares(shares);
    }
  }, [members, expense_amount, amountsByMember, setShares]);


  return (
    <div className="shares-inputs">
      <div className="full-width" id="split-options">
        <button
          className={`btn split-btn ${
            splitMethod === 'equally' ? 'btn-selected' : ''
          }`}
          type="button"
        >
          Equally
        </button>
        
      </div>

      {members.map((member, index) => (
        <SharesInputsItem
          splitMethod={splitMethod}
          key={member._id}
          member={member}
          index={index}
          currency={currency}
          shareAmount={amountsByMember[index]}
          setSharesByMember={setSharesByMember}
          setAmountsByMember={setAmountsByMember}
          setSelectedMembers={setSelectedMembers}
        />
      ))}
    </div>
  );
};

export default SharesInputs;
