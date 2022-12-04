import React, { useEffect, useState } from 'react';
import './App.css';
import {
  ChainId
} from "@biconomy/core-types";
import { ethers } from "ethers";
import SocialLogin from "@biconomy/web3-auth";
import erc20ABI from './abis/erc20.abi.json';
import fundMeABI from './abis/fundMe.abi.json';
import SmartAccount from "@biconomy/smart-account";
import Navbar from './Componenets/Navbar';
import { Routes, Route } from "react-router-dom";
import chat from './Componenets/Utilites/noun-chat-5344379.svg'
import DeviceId from './Componenets/DeviceId';
import { useNavigate } from 'react-router-dom';
import StepHabit from './Componenets/StepHabit';
import { fitbitSteps } from './Componenets/api';
import HydrateHabit from './Componenets/HydrateHabit';
import CalorieBurnt from './Componenets/CalorieBurnt';
import Add from './Componenets/Add';
import Redeem from './Componenets/Redeem';
import Home from './Componenets/Home';
import minter from './Componenets/Minter';

var now = new Date();
var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0) - now;
if (millisTill10 < 0) {
     millisTill10 += 86400000;
}

const App = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [socialLogin, setSocialLogin] = useState(false);
  const [smartAccountAddress, setSmartAccountAddress] = useState("");
  const [userBalance, setUserBalance] = useState({ symbol: "USDT", amount: 0 });
  const [dappBalance, setDappBalance] = useState({ symbol: "USDT", amount: 0 });
  const tokenAddress = "0xeaBc4b91d9375796AA4F69cC764A4aB509080A58";
  const dappContractAddress = "0x682b1f3d1afa69ddfa5ff62c284894a19fd395b4";

  //Add shardeum instead of polygon
  const activeChainId = ChainId.POLYGON_MUMBAI;

  let initWallet = async () => {
    console.log("init wallet");
    const socialLogin = new SocialLogin();
    await socialLogin.init(ethers.utils.hexValue(activeChainId));
    socialLogin.showConnectModal();
    const loggedInUser = localStorage.getItem("user");
    setSocialLogin(socialLogin);
    console.log(socialLogin)
    if (socialLogin.provider) {
      getTokenBalances();
      setIsLogin(true);
      if (!loggedInUser) {
        navigate('/device');
      }
    }
    return socialLogin;
  }

  useEffect(() => {
    initWallet();
  }, []);

  useEffect(() => {
    if (socialLogin) {
      initializeSmartAccount();
      getTokenBalances();
    }
  }, [socialLogin]);

  async function initializeSmartAccount() {
    let options = {
      activeNetworkId: activeChainId,
      supportedNetworksIds: [activeChainId],
      // Network Config. 
      // Link Paymaster / DappAPIKey for the chains you'd want to support Gasless transactions on
      networkConfig: [
        {
          chainId: activeChainId,
          dappAPIKey: "59fRCMXvk.8a1652f0-b522-4ea7-b296-98628499aee3", // Get one from Paymaster Dashboard
          // customPaymasterAPI: <IPaymaster Instance of your own Paymaster>
        }
      ]
    }

    const newProvider = new ethers.providers.Web3Provider(
      socialLogin.provider,
    );

    let smartAccount = new SmartAccount(newProvider, options);
    smartAccount = await smartAccount.init();
    console.log(smartAccount);
  }



  async function getTokenBalances() {
    if (socialLogin?.provider) {

      const newProvider = new ethers.providers.Web3Provider(
        socialLogin.provider,
      );

      const erc20Contract = new ethers.Contract(tokenAddress, erc20ABI, newProvider);
      const dappContract = new ethers.Contract(dappContractAddress, fundMeABI, newProvider);

      let smartAccount;
      await newProvider.listAccounts().then(async (accounts) => {
        console.log(accounts)
        smartAccount = accounts;
        setSmartAccountAddress(accounts)
      });
      console.log("smart account", smartAccount[0]);
      localStorage.setItem('user', smartAccount[0])
      const smartContractBalance = await erc20Contract.balanceOf(smartAccount[0]);
      const smartContractSymbol = await erc20Contract.symbol();
      const dappBalance = await dappContract.balanceOf(smartAccount[0], tokenAddress);
      setUserBalance({ amount: smartContractBalance.toString(), symbol: smartContractSymbol });
      setDappBalance({ amount: dappBalance.toString(), symbol: smartContractSymbol });

    } else {
      console.log("Social login is not defined")
    }
  }

  async function logout() {
    if (socialLogin) {
      await socialLogin.logout();
      socialLogin.hideWallet();
      setIsLogin(false);
      setSocialLogin(null);
      navigate('/');
      localStorage.clear();
    }
  }

  async function login() {
    try {
      if (socialLogin) {
        socialLogin.showWallet();
      } else {
        let socialLogin = await initWallet();
        socialLogin.showWallet();
        console.log("Social login is not defined");
        setTimeout(fitbitSteps, millisTill10);
        minter();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
        {!isLogin &&
          <Navbar onClick={login} tag={'Login'} />
        }
        {isLogin &&
          <Navbar onClick={logout} tag={'Logout'} />
        }
        <Routes>
        <Route path="/" element={<Home log={login}/>} />
          <Route path="/device" element={<DeviceId />} />
          <Route path="/stepTracker" element={<StepHabit/>} />
          <Route path="/HydrateTracker" element={<HydrateHabit />} />
          <Route path="/CalorieBurnt" element={<CalorieBurnt />} />
          <Route path="/add" element={<Add />} />
          <Route path="/redem" element={<Redeem />} />
        </Routes>
        <div>
        <a href="#" class="animate-bounce rounded-full w-16 h-16 bg-gray-100 fixed bottom-0 right-0 flex items-center justify-center text-gray-800 mr-8 mb-8 shadow-lg" target="_blank">
          <img src={chat} class="h-10 w-10 mr-2" />
        </a>
      </div>
    </div>
  );
}

export default App;