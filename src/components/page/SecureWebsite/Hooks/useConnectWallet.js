// WalletContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { BrowserProvider, formatEther } from 'ethers';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [ethBalance, setEthBalance] = useState('');
  const [ethBalanceUsdt, setEthBalanceUsdt] = useState('');
  const navigate = useNavigate();



  
  const getBalanceMainnet = async () =>{
    if (typeof window.ethereum !== 'undefined') {
      const provider1 = new BrowserProvider(window.ethereum);
      const rawBalance = await provider1.getBalance(walletAddress);
      const rawBalanceUsdt = await provider1.getBalance(
        '0x55d398326f99059fF775485246999027B3197955'
      );

      const ethBalance = formatEther(rawBalance);
      const ethBalanceUsdt = formatEther(rawBalanceUsdt);

      setEthBalance(ethBalance);
      setEthBalanceUsdt(ethBalanceUsdt)
    } else {
      console.log('dataaaaaaa')
    }
 }

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider1 = new BrowserProvider(window.ethereum);

        const accounts = await provider1.send('eth_requestAccounts', []);
        const address = accounts[0];
        setWalletAddress(address);

        const rawBalance = await provider1.getBalance(address);
        const rawBalanceUsdt = await provider1.getBalance(
          '0x55d398326f99059fF775485246999027B3197955'
        );

        const ethBalance = formatEther(rawBalance);
        const ethBalanceUsdt = formatEther(rawBalanceUsdt);

        setEthBalance(ethBalance);
        setEthBalanceUsdt(ethBalanceUsdt);


          await axios
          .post(`https://backend.dsl.sg/api/v1/arbitrage/user`, {
            walletAddress: address,
          })
          .then((res) => {
            if (res.data.user) {
              setUser(res.data.user);
              setLoading(false);
              getBalanceMainnet();
              localStorage.setItem("tokenSecureWeb", res.data.token);
              return null;
            } else {
              console.log("NO data Here");
              return null;
            }
          });
        

        navigate('/dashboard', {
          state: {
            walletAddress: address,
            ethBalance,
            ethBalanceUsdt,
          },
        });
      } else {
        alert('MetaMask is not installed. Please install MetaMask and try again.');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };




  const logout = () => {
    if (window.confirm('Are you sure you want to disconnect your wallet?')) {
      setWalletAddress('');
      setEthBalance('');
      setUser({});
      setEthBalanceUsdt('');
      localStorage.removeItem("tokenSecureWeb");
      navigate('');
    }
  };


   //changes on user account change
   useEffect(() => {
    if (localStorage.getItem("tokenSecureWeb")) {
      setLoading(true);
      axios
        .get(`https://backend.dsl.sg/api/v1/arbitrage/user`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("tokenSecureWeb")}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
          getBalanceMainnet();
        });
      // setUserRefetch(false);
    }
  }, [localStorage.getItem("tokenSecureWeb")]);

  
  return (
    <WalletContext.Provider
      value={{ 
        walletAddress, 
        ethBalance, 
        ethBalanceUsdt, 
        connectWallet, 
        logout,
        user,
       }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
