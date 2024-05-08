import React, { useState, useEffect } from 'react';
import './courses.css';
import Web3 from 'web3';
import ReactDOM from 'react-dom';
import NavBarOther from '../../Components/navBar/NavBarOther';

function VideoPage({ videoUrl }) {
  const videoRef = React.createRef();

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div>
      <video ref={videoRef} controls width='560' height='315'>
        <source src={videoUrl} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <button onClick={handleFullscreen}>Fullscreen</button>
      <h1>BlockChain</h1>
    </div>
  );
}


function Card({ card }) {
  const [address, setAddress] = useState('');
  const [web3, setWeb3] = useState(null);
  const [transactionComplete, setTransactionComplete] = useState(false);

  async function connectToMetaMask() {
    // Request access to the MetaMask accounts
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Create a Web3 instance using the MetaMask provider
    
    const web3Instance = new Web3(window.ethereum);
    setWeb3(web3Instance);

    // You can now use the web3 instance to interact with the blockchain
    // For example, you can get the connected account:
    const accounts = await web3Instance.eth.getAccounts();
    const connectedAddress = accounts[0];
    setAddress(connectedAddress);
    alert('Connected to MetaMask with address: ' + connectedAddress);

    // You can also send transactions using the web3 instance, for example:
  }

  async function transfer(price) {
    if (!web3) {
      console.log('Web3 instance not available. Connect to Logincards first.');
      return;
    }

    const valueInEther = price; // Change this to a smaller value, like '0.001'
    const valueInWei = web3.utils.toWei(valueInEther.toString(), 'ether');
    const transaction = {
      from: address,
      to: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      value: valueInWei,
    };

    try {
      const response = await web3.eth.sendTransaction(transaction);
      console.log('Transaction sent:', response);
      console.log('Done');

      // Set transaction status to true after the transaction is complete
      setTransactionComplete(true);
    } catch (error) {
      console.error('Error sending transaction:', error.message);
    }
  }

  function handleStartLearning() {
    // Open a new window
    const newWindow = window.open('', '_blank');
  
    // Create a new HTML document for the new window
    const newDocument = newWindow.document;
    const newRoot = newDocument.createElement('div');
    newRoot.id = 'root'; // Ensure the root element has the correct ID
    newDocument.body.appendChild(newRoot);
  
    // Render the VideoPage component inside the new window's root element
    ReactDOM.render(<VideoPage videoUrl={card.videoUrl} />, newRoot);
  
    // Close the new window if the user navigates away from it
    newWindow.onbeforeunload = () => newWindow.close();
  }
  function handleStartLearning() {
    // Open the video URL in a new tab
    window.open(card.videoUrl, '_blank');
  }

  return (
    <>
    <NavBarOther/>
    <div className='ctn'>
      <div className='flip-card' key={card.id}>
        <div className='flip-card-inner'>
          <div className='flip-card-front'>
            <div className='card'>
              <img className='card-img-top' src={card.imageSrc} alt='CardImage cap' />
              <div className='card-body'>
                <h3 className='card-title'>{card.title}</h3>
                <p className='card-text'>{card.text}</p>
              </div>
            </div>
          </div>
          <div className='flip-card-back'>
            <div className='card'>
              {transactionComplete ? (
                <button className='btn btn-3' onClick={handleStartLearning}>
                  Start learning
                </button>
              ) : (
                <>
                  <button className='btn btn-1' onClick={connectToMetaMask}>
                    Connect to MetaMask
                  </button>
                  <button className='btn btn-2' onClick={() => transfer(card.price)}>
                    Buy @ {card.price} ETH
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

function CoursesNadmin() {
  const [cardsData, setCardsData] = useState([    {
      id: 1,
      imageSrc: 'https://leverageedu.com/blog/wp-content/uploads/2021/08/Best-Blockchain-Courses.png',
      title: 'BlockChain',
      text: "If you're  to learn more about blockchain technology, Best free courses in the industry. Check out Cryptocurrency to gain a fundamental understanding of the cryptocurrency landscape.",
      price: 10,
      videoUrl: 'https://www.youtube.com/embed/gyMwXuJrbJQ?t=58', // Replace with the actual pre-uploaded video URL for this card
    },
    {
      id: 2,
      imageSrc: 'https://www.optilingo.com/wp-content/uploads/2019/02/199154810.jpg',
      title: 'Cyber security',
      text: 'Become a cyber security specialist. The very latest up-to- and methods. We cover operating system security, privacy, and patching. DevSec, digital forensics, cloud security',
      price: 30,
      videoUrl: 'https://www.youtube.com/embed/hXSFdwIOfnE', // Replace with the actual pre-uploaded video URL for this card
    },
    {
      id: 3,
      imageSrc: 'https://juergenkurtz.files.wordpress.com/2015/10/conf-luneburg-2015.jpg',
      title: ' C++',
      text: 'C++ is a high-level cross-platform general-purpose programming language. It was created at Bell Labs by Bjarne Stroustrup as an extension to the C programming language.',
      price: 40,
      videoUrl: 'https://www.youtube.com/embed/hXSFdwIOfnE', // Replace with the actual pre-uploaded video URL for this card

    },
    {
      id: 4,
      imageSrc: 'https://techcrunch.com/wp-content/uploads/2016/02/shutterstock_348701531.jpg?w=730&crop=1',
      title: 'Traning',
      text: 'The Central Line Placement Skills  follows  2010 Central Venous Access Device Guidelines for central venous catheter insertion for HHC, which includes the use of the central line bundle kit',
      price: 50,
      videoUrl: 'https://www.youtube.com/embed/hXSFdwIOfnE',
    },
    {
      id: 5,
      imageSrc: 'https://s3.amazonaws.com/media.the-next-tech.com/wp-content/uploads/2020/05/19162205/learn-new-language.jpg',
      title: 'Learn English',
      text: 'Learn English Online. We have been helping people with their English since 1999. For the love of English. Learn English Online is  intermediate learners course.It is more and more impoertant in our day to day life. ',
      price: 60,
      videoUrl: 'https://www.youtube.com/embed/hXSFdwIOfnE',
    },
    {
      id: 6,
      imageSrc: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200717144410/Learn-C-Programming-for-Beginners-A-20-Day-Curriculum.png',
      title: 'C',
      text: 'Learn C Programming  your skills as a coder of  nation that is  and so on online today. Choose from a wide range of C Programming courses offered from top universities and industry leaders.',
      price: 45,
      videoUrl: 'https://www.youtube.com/embed/hXSFdwIOfnE',
    },
    {
      id: 7,
      imageSrc: 'https://blog.ted.com/wp-content/uploads/sites/2/2014/11/learning_a_language.png',
      title: 'Data Analist',
      text: 'The average salary for a Data Analyst in New York is $86,704. Learn more about additional compensation, pay by gender and years of experience.To become a Well rich person.',
      price: 70,
      videoUrl: 'https://www.youtube.com/embed/hXSFdwIOfnE',
    },
    {
      id: 8,
      imageSrc: 'https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=',
      title: 'PhotoGraphy',
      text: "Whether you have experience and want to improve your skills, or you're considering a career in Photography,  features a wide range of Photography courses, Fashion Photography courses ",
      price: 75
    },
    {
      id: 9,
      imageSrc: 'data:image/png;base64,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',
      title: 'UIUX',
      text: "Whether you have experience and want to improve your skills, or you're considering a career in Photography,  features a wide range of Photography courses, Fashion Photography courses ",
      price: 75
    },
    {
      id: 10,
      imageSrc: 'https://i0.wp.com/sysreseau.net/wp-content/uploads/2018/07/cloud-1-1.png?fit=613%2C408&ssl=1',
      title: 'Cloud com',
      text: "Whether you have experience and want to improve your skills, or you're considering a career in Photography,  features a wide range of Photography courses, Fashion Photography courses ",
      price: 75
    },
    // Add videoUrl property for other cards as well
  ]);

  const [newCardData, setNewCardData] = useState({
    id: '',
    imageSrc: '',
    title: '',
    text: '',
    price: '',
    videoUrl: '',
  });

  // Function to handle form submission and add the new card data to cardsData
  const addCardData = (e) => {
    e.preventDefault();
    const newCard = {
      id: parseInt(newCardData.id),
      imageSrc: newCardData.imageSrc,
      title: newCardData.title,
      text: newCardData.text,
      price: parseFloat(newCardData.price),
      videoUrl: newCardData.videoUrl,
    };
    setCardsData([...cardsData, newCard]);
    setNewCardData({
      id: '',
      imageSrc: '',
      title: '',
      text: '',
      price: '',
      videoUrl: '',
    });
  };

  // Function to handle input changes for the new card form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCardData({ ...newCardData, [name]: value });
  };


  return (
    <div className='cardcontainer'>
      {cardsData.map((card) => (
        <Card key={card.id} card={card} />
      ))}
      {/* Form to add a new card */}
      <div className='new-card-form'>
        <h2>Add a New Course</h2>
        <form onSubmit={addCardData}>
          <input
            type='number'
            name='id'
            placeholder='ID'
            value={newCardData.id}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='imageSrc'
            placeholder='Image URL'
            value={newCardData.imageSrc}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='title'
            placeholder='Title'
            value={newCardData.title}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='text'
            placeholder='Text'
            value={newCardData.text}
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
            type='text'
            name='videoUrl'
            placeholder='Video URL'
            value={newCardData.videoUrl}
            onChange={handleInputChange}
          />
          <button type='submit'>Add Card</button>
        </form>
      </div>
    </div>
  );
}

export default CoursesNadmin;