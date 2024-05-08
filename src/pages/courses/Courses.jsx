import React, { useState, useEffect } from 'react';
import './courses.css';
import Web3 from 'web3';
import Navbar from '../../Components/navBar/NavBar';
import VideoModal from './VideoModal';


function Card({ card ,contract,account,coursetransaction,updateLeaderboard}) {
  const [address, setAddress] = useState('');
  const [web3, setWeb3] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [coursetransactionComplete, setCourseTransactionComplete] = useState(false);

  useEffect(() => {
    async function fetchCourseStatus() {
      try {
        const hasPurchased = await contract.methods.hasPurchasedCourse(account, card.id).call({ from: account });
        console.log("HI")
        setCourseTransactionComplete(hasPurchased);
      } catch (error) {
        console.error('Error fetching course status:', error);
      }
    }

    fetchCourseStatus();
  }, [contract, account, card.id]);



  function handleStartLearning() {
    setShowModal(true);
  }
  function handleCloseModal() {
    setShowModal(false);
  }

  async function connectToMetaMask() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const web3Instance = new Web3(window.ethereum);
    setWeb3(web3Instance);
    const accounts = await web3Instance.eth.getAccounts();
    const connectedAddress = accounts[0];
    setAddress(connectedAddress);
    alert('Connected to MetaMask with address: ' + connectedAddress);

    // You can also send transactions using the web3 instance, for example:
  }
  useEffect(() => {
    connectToMetaMask();
  }, []);

  async function transfer(price, courseId) {
    if (!web3) {
      console.log('Web3 instance not available. Connect to Logincards first.');
      return;
    }

    const valueInEther = price; // Change this to a smaller value, like '0.001'
    const valueInWei = web3.utils.toWei(valueInEther.toString(), 'ether');
    const transaction = {
      from: address,
      to: '0xb4f64431dE4D4F5FEE5FD2842569a97865f882Ea',
      value: valueInWei,
      gasPrice: '20000000000', // Adjust the gas price as needed
      gas: '50000',
    };

    try {
      const response = await web3.eth.sendTransaction(transaction);
      console.log('Transaction sent:', response);
      console.log('Done');

    // After successful transaction, add the course to the contract for the user
    await contract.methods.addPurchasedCourse(courseId).send({ from: account });
    // Set transaction status to true after the transaction is complete
    setCourseTransactionComplete(true);
    updateLeaderboard(card.id);
    } catch (error) {
      console.error('Error sending transaction:', error.message);
    }
  }

  return (
    <>
    <div className='ctn'>
      <div className='flip-card' key={card.id}>
        <div className='flip-card-inner'>
          <div className='flip-card-front'>
            <div className='card'>
              <img className='card-img-top' src={card.imgsrc} alt='CardImage cap' />
              <div className='card-body'>
                <h3 className='card-title'>{card.title}</h3>
                <p className='card-descrip'>{card.descrip}</p>
              </div>
            </div>
          </div>
          <div className='flip-card-back'>
            <div className='card'>
              {coursetransactionComplete ? (
                <button className='btn btn-3' onClick={handleStartLearning}>
                  Start learning
                </button>
              ) : (
                <>
                  <button className='btn btn-1' onClick={connectToMetaMask}>
                    Connect to MetaMask
                  </button>
                  {console.log(card)}
                  <button className='btn btn-2' onClick={() => transfer(card.price,card.id)}>
                    Buy @ {parseInt(card.price)} ETH
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    {showModal && <VideoModal videourl={card.videourl} onClose={handleCloseModal} coursename={card.title} />}

    </>
  );
}

function Courses({ contract, account }) {
  const [admin, setAdmin] = useState(false);
  const [courses, setCourses] = useState([]);
  const [coursetransactionComplete, setTransactionComplete] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [newCardData, setNewCardData] = useState({
    id: '',
    imgsrc: '',
    title: '',
    descrip: '',
    price: '',
    videourl: '',
  });


  // Function to fetch courses from the contract
  async function fetchCourses() {
    try {
      const courseData = await contract.methods.displayCourses().call({ from: account });
      setCourses(courseData);
      console.log("courseData",courseData)
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }
  // Function to update leaderboard data after purchasing a course
  async function updateLeaderboard(courseId) {
    try {
      // Fetch the updated leaderboard data from the contract
      const updatedLeaderboardData = await contract.methods.updateLeaderboard(courseId).call({ from: account });
      setLeaderboardData(updatedLeaderboardData);
    } catch (error) {
      console.error('Error updating leaderboard:', error);
    }
  }

  // Function to handle form submission and add the new course to the contract
  async function addCourse(newCourse) {
    try {
      const response = await contract.methods
        .getCourse(
          newCourse.id,
          newCourse.imgsrc,
          newCourse.title,
          newCourse.descrip,
          newCourse.videourl,
          newCourse.price
        )
        .send({ from: account });

      console.log('Course added:', response);
          setCourses([...courses, newCourse]);

    } catch (error) {
      console.error('Error adding course:', error);
    }
  }

  // Function to handle input changes for the new course form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCardData({ ...newCardData, [name]: value });
  };

  useEffect(() => {

    async function checkingAdmin() {
      try {
        const res = await contract.methods.checkAdmin().call({ from: account });
        console.log("contract:",contract)
        console.log("admin:",res)
        setAdmin(res);
      } catch (error) {
        console.error('Error checking admin:', error);
      }
    }

    checkingAdmin();
    fetchCourses();
  }, [contract, account]);

  return (
    <>
      <Navbar contract={contract} account={account} />
      <div className='cardcontainer'>
        {courses.map((course) => (
         
         <>{console.log(course)}
          <Card key={course.id} contract={contract} account={account} card={course} coursetransaction={coursetransactionComplete} />
          </>
        ))}
        {admin ? (
          <div className='new-card-form'>
            <h2>Add a New Course</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newCourse = {
                  id: parseInt(newCardData.id),
                  imgsrc: newCardData.imgsrc,
                  title: newCardData.title,
                  descrip: newCardData.descrip,
                  price: newCardData.price,
                  videourl: newCardData.videourl,
                };
                addCourse(newCourse);
              }}
            >
          <input
            type='number'
            name='id'
            placeholder='ID'
            value={newCardData.id}
            onChange={handleInputChange}
          />
          <input
            type='descrip'
            name='imgsrc'
            placeholder='Image URL'
            value={newCardData.imgsrc}
            onChange={handleInputChange}
          />
          <input
            type='descrip'
            name='title'
            placeholder='Title'
            value={newCardData.title}
            onChange={handleInputChange}
          />
          <input
            type='descrip'
            name='descrip'
            placeholder='descrip'
            value={newCardData.descrip}
            onChange={handleInputChange}
          />
          <input
            type='number'
            name='price'
            placeholder='Price'
            value={newCardData.price}
            onChange={handleInputChange}
          />
          <input
            type='descrip'
            name='videourl'
            placeholder='Video URL'
            value={newCardData.videourl}
            onChange={handleInputChange}
          />
          <button type='submit'>Add Card</button>
            </form>
          </div>
        ) : (
          <h1></h1>
        )}
      </div>
    </>
  );
}

export default Courses;