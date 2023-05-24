import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateGroup } from '../../../api/groups';
import { getUserInfo } from '../../../api/userInfo';
import { getGroupById } from '../../../api/groups';
import toast, { Toaster } from 'react-hot-toast';
import './GroupMembersForm.css';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

const GroupMembersForm = ({ setPageStatus, defaultMembers }) => {
  const [userInfo, setUserInfo] = useState(undefined);
  const [members, setMembers] = useState([]);
  const [addNewContact, setAddNewContact] = useState(false);

  const { groupId } = useParams();

  const [addedMembers, setAddedMembers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    const getUserData = async () => {
      const userInfo = await getUserInfo();
      const groupInfo=await getGroupById(groupId);
      if (userInfo) {
        setUserInfo(userInfo);
        setMembers(groupInfo.group.members)
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const members = [...addedMembers];
    setMembers(members);
  }, [addedMembers]);

 

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    const isPresent = addedMembers.filter((addedMember) => {
      return addedMember.email === email;
    });

    if (isPresent.length === 0) {
      setMembers((prev) => {
        return [
          ...prev,
          {
            _id: undefined,
            firstName: capitalizeFirstLetter(firstName.trim()),
            lastName: capitalizeFirstLetter(lastName.trim()),
            email: email.trim(),
          },
        ];
      });
    }
    setEmail('');
    setFirstName('');
    setLastName('');
    setAddNewContact(false);
  };
  const handleCancelBtn = () => {
    if (defaultMembers.length === 1) {
      setPageStatus('expenses');
    } else {
      setPageStatus('groupForm');
    }
  };

  const handleSubmitMembers = async (e) => {
    e.preventDefault();
    const {success,errorMessage}=await updateGroup(groupId, {
      members: members,
    });

    if (!success) {
      toast.error(errorMessage);
    } else {
      setPageStatus('expenses');
    }
  };

  const handleAddNewContact = () => {
    setAddNewContact((prev) => !prev);
  };

  return (
    <div className="group-members-form">
      {userInfo && (
        <>
          <div className="group-members-form-header">
            <h1>Group members</h1>
            <button
              onClick={handleCancelBtn}
              type="button"
              className="icon-btn"
            >
              <i className="fa-solid fa-xmark fa-2x"></i>
            </button>
          </div>

          <div className="selected-members">
            {members &&
              members?.map((member, index) => (
                <div className="selected-members-item" key={index}>
                  <div className="selected-members-item-circle">
                    <div>
                      <span>{member.firstName.slice(0, 1)}</span>{' '}
                      <span>{member.lastName.slice(0, 1)}</span>{' '}

                    </div>
                  </div>
                  <span>{member.firstName}</span>
                </div>
              ))}
          </div>

          <div className="add-new-contact-btn" onClick={handleAddNewContact}>
            <button onClick={handleAddNewContact} className="icon-btn">
              <i className="fa-solid fa-user-plus fa-2x"></i>
            </button>
            <span>Add a new contact</span>
          </div>

          {addNewContact && (
            <div>
              <form onSubmit={handleAddMember} className="add-members-form">
                <input
                  className="form-input"
                  type="text"
                  placeholder="First Name"
                  onChange={handleFirstName}
                  value={firstName}
                  required
                />
                <input
                  className="form-input"
                  placeholder="Last Name"
                  onChange={handleLastName}
                  value={lastName}
                  required
                />
                <input
                  className="form-input"
                  placeholder="Email"
                  onChange={handleEmail}
                  value={email}
                  required
                />
                <button className="btn add-members-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
          )}
          <button className="btn save-btn" type="submit" onClick={handleSubmitMembers}>
                Save
              </button>
        </>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default GroupMembersForm;
