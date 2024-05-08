import React, { useState,useEffect } from 'react';
import "./loginCards.css"
import Web3 from 'web3';

function Logincards() {
    const [address, setAddress] = useState('');
    const [web3, setWeb3] = useState(null);
  
    const cardsData = [
      {
        id: 1,
        imageSrc: 'https://leverageedu.com/blog/wp-content/uploads/2021/08/Best-Blockchain-Courses.png',
        title: 'BlockChain',
        text: "If you're  to learn more about blockchain technology,Best free courses in the industry. Check out Cryptocurrency to gain a fundamental understanding of the cryptocurrency landscape.",
        price: 10
      },
      {
        id: 2,
        imageSrc: 'https://www.optilingo.com/wp-content/uploads/2019/02/199154810.jpg',
        title: 'Cyber security',
        text: 'Become a cyber security specialist. The very latest up-to-date information and methods. We cover operating system security, privacy, and patching. DevSec, digital forensics, cloud security',
        price: 30
      },
      {
        id: 3,
        imageSrc: 'https://juergenkurtz.files.wordpress.com/2015/10/conf-luneburg-2015.jpg',
        title: ' C++',
        text: 'C++ is a high-level cross-platform general-purpose programming language. It was created at Bell Labs by Bjarne Stroustrup as an extension to the C programming language.',
        price: 40
      },
      {
        id: 4,
        imageSrc: 'https://techcrunch.com/wp-content/uploads/2016/02/shutterstock_348701531.jpg?w=730&crop=1',
        title: 'Traning',
        text: 'The Central Line Placement Skills course follows the 2010 Central Venous Access Device central venous catheter insertion for HHC, which includes the use of the central line bundle kit',
        price: 50
      },

    ];
  
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
    useEffect(() => {
      connectToMetaMask();
    }, []);
  
    async function transfer() {
      if (!web3) {
        console.log('Web3 instance not available. Connect to Logincards first.');
        return;
      }
      const valueInEther = '100'; // Change this to a smaller value, like '0.001'
      const valueInWei = web3.utils.toWei(valueInEther, 'ether');
    
      const transaction = {
        from: address,
        to: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        value: valueInWei
      };
    
      try {
        const response = await web3.eth.sendTransaction(transaction);
        console.log('Transaction sent:', response);
      } catch (error) {
        console.error('Error sending transaction:', error.message);
      }
    }
    
    async function fetchData() {
      if (!web3) {
        console.log('Web3 instance not available. Connect to Logincards first.');
        return;
      }
  
      try {
        // Mathe RPC call (example: get the latest block number)
        const blockNumber = await web3.eth.getBlockNumber();
  
        // Process the output as needed
        console.log('Latest block number:', blockNumber);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }
  

  return (
<>
<h1><center>Trending Courses</center></h1>
<div className='cardcontainer'>
      {cardsData.map((card) => (
        <div className="flip-card" key={card.id}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card">
                <img className="card-img-top" src={card.imageSrc} alt="CardImage cap" />
                <div className="card-body">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-text">{card.text}</p>
                </div>
              </div>
            </div>
            <div className="flip-card-back">
              <div className="card">
                {/* <button className="btn btn-1" onClick={connectToMetaMask}>
                  Connect to MetaMask
                </button>
                <button className="btn btn-2" onClick={() => transfer(card.price)}>
                  Buy @ {card.price} ETH
                </button> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Logincards;