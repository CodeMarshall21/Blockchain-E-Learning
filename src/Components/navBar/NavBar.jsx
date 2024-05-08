import React, { useEffect, useState, useCallback } from 'react';
import './navBar.css';
import LoginForm from '../Login/loginForm';
import { Link } from 'react-router-dom';
import Web3 from "web3";
import { ABI,contractaddress } from '../Abi';
const Navbar = ({ contract, account }) => {
  const [isNavActive, setNavActive] = useState(false);
  const [isLoginFormVisible, setLoginFormVisible] = useState(false);
  const [user, setUser] = useState('Unknown');
  const [signinButton, setSigninButton] = useState('Register');

  const handleNavToggle = useCallback(() => {
    setNavActive((prevNavActive) => !prevNavActive);
  }, []);

  const handleSignInClick = useCallback(() => {
    setLoginFormVisible(true);

  }, []);

  const handleCloseLoginForm = useCallback(() => {
    setLoginFormVisible(false);
  }, []);

  const profile = useCallback(async () => {
    try {
      if (!contract || !account) {
        console.log('Contract or account not initialized.');
        return;
      }
      const web3Instance = new Web3(window.ethereum);
      const contractInstance = new web3Instance.eth.Contract(
        ABI,
        contractaddress
    );
      const _userName = await contract.methods.displayUserProfile().call({ from: account });
      console.log(_userName);
      const isAdmin_ = await contract.methods.checkAdmin().call({ from: account });
      console.log(isAdmin_);
      const verify = await contract.methods.Login().call({ from: account });
      console.log(verify);

      if (verify) {
        setSigninButton('Log In');
      } else {
        setSigninButton('Register');
        setUser("Unknown");
      }

      if (isAdmin_) {
        setSigninButton('Admin LoggedIn');
        setUser('admin');
      } else if (_userName) {
        setSigninButton('LoggedIn');
        setUser(_userName);
      }
    } catch (error) {
      console.error('Error retrieving user profile:', error);
    }
  }, [contract, account]);

  useEffect(() => {
    if (contract && account) {
      profile();
    }
  }, [contract, account, profile]);


  return (
    <nav className={`pt-navbar ${isNavActive ? '-visible' : ''}`}>
      <div className="pt-navbar-logo">
      <a href="#" title="De-Learn Technologies"><img src="https://www.freepnglogos.com/uploads/graduation-cap-png/graduation-cap-variant-education-icons-27.png" width="43px" alt="graduation cap variant education icons" /> De-Learn </a>      
      </div>
      <div className={`pt-navbar-navs ${isNavActive ? '-active' : ''}`}>
        <div className="pt-navbar-nav">
        <Link to="/">
            <span title="Home">Home</span>
          </Link>
        </div>
        <div className="pt-navbar-nav">
        <Link to="/courses">
            <span title="Courses">Courses</span>
          </Link>
        </div>
        <div className="pt-navbar-nav">
        <Link to="/about">
            <span title="About Us">About</span>
          </Link>
        </div>
        <div className="pt-navbar-nav">
        <Link to="/contact">
            <span title="Contact Us">Contact</span>
          </Link>
        </div>
        <div className="pt-navbar-nav">
        <Link to="/leaderboard">
            <span title="leaderboard">LeaderBoard</span>
          </Link>
        </div>
      </div>
      <div className="pt-navbar-actions">
        <button onClick={handleSignInClick}>{signinButton}</button>
        <button>Hello, {user}</button>  
      </div>
      <div className="pt-navbar-toggle" onClick={handleNavToggle}>
      </div>
      <div className="pt-navbar-bg" onClick={handleNavToggle}></div>
      {isLoginFormVisible &&     <LoginForm
          contract={contract}
          account={account}
          onCloseForm={handleCloseLoginForm} // Pass the function as a prop
        />}

    </nav>
  );
};

export default Navbar;