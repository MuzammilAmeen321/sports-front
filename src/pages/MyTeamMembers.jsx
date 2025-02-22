import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import VerticleNav from '../components/verticleNav';
import Navbar from '../components/Header/header';
import { useParams } from "react-router-dom";
import axios from 'axios';

const MyTeamMembers = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [captainData, setCaptainData] = useState({
    name: "",
    totalMatches: 0,
    won: 0,
    loss: 0,
    imageUrl: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [topUsers, setTopUsers] = useState([]); // State to store top 10 users
  const [searchQuery, setSearchQuery] = useState(""); // State for search bar
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users

  // Fetch captain data
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://127.0.0.1:8000/api/captain/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCaptainData({
          name: response.data.name || "Captain Name",
          totalMatches: response.data.totalMatches || 0,
          won: response.data.won || 0,
          loss: response.data.loss || 0,
          imageUrl: response.data.imageUrl
            ? `http://127.0.0.1:8000/storage/${response.data.imageUrl}`
            : "https://via.placeholder.com/150",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [id]);

  // Fetch top 10 users when modal is opened
  useEffect(() => {
    if (isModalOpen) {
      const fetchTopUsers = async () => {
        try {
          const token = localStorage.getItem("authToken");
          const response = await axios.get(`http://127.0.0.1:8000/api/top-users`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTopUsers(response.data);
          setFilteredUsers(response.data); // Initialize filtered users with top users
        } catch (err) {
          console.error("Failed to fetch top users:", err);
        }
      };

      fetchTopUsers();
    }
  }, [isModalOpen]);

  // Handle search
  useEffect(() => {
    if (searchQuery) {
      const filtered = topUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(topUsers); // Reset to top users if search query is empty
    }
  }, [searchQuery, topUsers]);

  // Open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSearchQuery(""); // Reset search query when modal is closed
  };

  // Handle "View More" button click
  const handleViewMore = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`http://127.0.0.1:8000/api/more-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTopUsers([...topUsers, ...response.data]); // Append more users to the list
      setFilteredUsers([...topUsers, ...response.data]); // Update filtered users
    } catch (err) {
      console.error("Failed to fetch more users:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const captain = {
    name: captainData.name,
    role: "Captain",
    totalMatches: captainData.totalMatches,
    won: captainData.won,
    loss: captainData.loss,
    imageUrl: captainData.imageUrl,
  };

  const players = [
    captain,
    {
      name: "Virat Kohli",
      role: "Batsman",
      totalMatches: 250,
      won: 180,
      loss: 70,
      imageUrl: "https://example.com/virat-kohli.jpg",
    },
    {
      name: "MS Dhoni",
      role: "Wicketkeeper-Batsman",
      totalMatches: 350,
      won: 250,
      loss: 100,
      imageUrl: "https://example.com/ms-dhoni.jpg",
    },
    {
      name: "Jasprit Bumrah",
      role: "Bowler",
      totalMatches: 150,
      won: 100,
      loss: 50,
      imageUrl: "https://example.com/jasprit-bumrah.jpg",
    },
  ];

  return (
    <StyledWrapper>
      <Navbar />
      <div className="container m-auto p-3">
        <div className="row">
          <div className="col-12 m-2 d-flex justify-content-end">
            <button className="text-dark bg-warning p-2 rounded-md min-w-[140px]" onClick={openModal}>
              Add New member
            </button>
          </div>
          {players.map((player, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <div className="book">
                <div className="cover">
                  <img src={player.imageUrl} alt={player.name} />
                  <div className="details">
                    <h3>{player.name}</h3>
                    <p><strong>Role:</strong> {player.role}</p>
                    <p><strong>Total Matches:</strong> {player.totalMatches}</p>
                    <p><strong>Won:</strong> {player.won}</p>
                    <p><strong>Loss:</strong> {player.loss}</p>
                    <button className="view-profile-btn">View Profile</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <VerticleNav />

      {/* Modal for adding new members */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h3>Add New Member</h3>
              <button onClick={closeModal}>&times;</button>
            </ModalHeader>
            <SearchBar
              type="text"
              placeholder="Search users by name or player code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <UserList>
              {filteredUsers.map((user, index) => (
                <UserItem key={index}>
                  <img src={user.imageUrl || "https://via.placeholder.com/50"} alt={user.name} />
                  <div>
                    <h4>{user.name}</h4>
                    <p>{user.role}</p>
                  </div>
                  <button onClick={() => alert(`Add ${user.name} to team`)}>Add</button>
                </UserItem>
              ))}
            </UserList>
            <ViewMoreButton onClick={handleViewMore}>View More</ViewMoreButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </StyledWrapper>
  );
};

// Styled Components
const StyledWrapper = styled.div`
  .book {
    position: relative;
    border-radius: 10px;
    width: 100%;
    height: 400px;
    background-color: #333;
    box-shadow: 1px 1px 12px #000;
    transform: preserve-3d;
    perspective: 2000px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 10px;
    overflow: hidden;
    margin-bottom: 20px;
  }

  .cover {
    top: 0;
    position: absolute;
    background-color: #222;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s;
    transform-origin: 0;
    box-shadow: 1px 1px 12px #000;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.5s;
  }

  .details {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.5s;
    padding: 20px;
    text-align: center;
  }

  .details h3 {
    margin-bottom: 10px;
    font-size: 1.5rem;
  }

  .details p {
    margin: 5px 0;
    font-size: 1rem;
  }

  .view-profile-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #ff5722;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 1rem;
  }

  .view-profile-btn:hover {
    background-color: #e64a19;
  }

  .book:hover .cover img {
    opacity: 0;
  }

  .book:hover .details {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .book {
      height: 300px;
    }

    .details h3 {
      font-size: 1.2rem;
    }

    .details p {
      font-size: 0.9rem;
    }

    .view-profile-btn {
      padding: 8px 16px;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 576px) {
    .book {
      height: 250px;
    }

    .details h3 {
      font-size: 1rem;
    }

    .details p {
      font-size: 0.8rem;
    }

    .view-profile-btn {
      padding: 6px 12px;
      font-size: 0.8rem;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    margin: 0;
  }

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  h4 {
    margin: 0;
    font-size: 1rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
  }

  button {
    margin-left: auto;
    padding: 5px 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background: #0056b3;
  }
`;

const ViewMoreButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #0056b3;
  }
`;

export default MyTeamMembers;