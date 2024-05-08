import "./app.css";
import Courses from "./pages/courses/Courses";
import Contact from "./pages/contact/ContactForm";
import About from "./pages/about/About";
import Home from "./Components/home/Home";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoursesNadmin from "./pages/courses/CoursesNadmin";
import { useState,useEffect } from "react";
import Web3 from "web3";
import Navbar from "./Components/navBar/NavBar";
import ContactForm from "./pages/contact/ContactForm";
import { ABI,contractaddress } from "./Components/Abi";

  // const contractaddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  // const _admin=false;
  // console.log("App",admin)

  function App() {
  
  
  const [account,setAccount] = useState("");  // To store account of user
  const [contract, setContract] = useState("");  // To store current instance of Contract

  useEffect(() => {
      connectToWeb3();
  }, []);

  const connectToWeb3 = async () => {
  if (window.ethereum) {
      try {
      //Connect to an Ethereum provider
      const acc = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3Instance = new Web3(window.ethereum);
      console.log("Web3 Instance Created");
       // Get the initial account
      
      setAccount(acc[0]);
      console.log("Account Initialized");
      

    // Listen for account changes
      window.ethereum.on('accountsChanged', accounts => {
      setAccount(accounts[0]);
      console.log("Account Switched");
      });
      // Instantiate the contract
      const contractInstance = new web3Instance.eth.Contract(
          ABI,
          contractaddress
      );
      setContract(contractInstance);
      console.log("Contract Instance Created");

      } catch (error) {
      console.error(error);
      }
  } 
  else {
      alert("Please install MetaMask or another Ethereum-compatible browser extension.");
      console.log('MetaMask not Found');
  }


};
console.log("APP -- contract",contract)

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home contract={contract} account={account} />} />
        <Route path="/about" element={<About contract={contract} account={account} />} />
        <Route path="/courses" element={ <Courses contract={contract} account={account} />} />
        <Route path="/contact" element={<ContactForm  contract={contract} account={account} />} />
        <Route path="/leaderboard" element={<Leaderboard/>}/>
      </Routes>
    </div>
);
}

export default App;
