import React, { useEffect, useState } from "react";
import "./App.css";
import { ChainId } from "@biconomy/core-types";
import { ethers } from "ethers";
import SocialLogin from "@biconomy/web3-auth";

import erc20ABI from "./abis/erc20.abi.json";
import fundMeABI from "./abis/fundMe.abi.json";

import SmartAccount from "@biconomy/smart-account";

import * as PushAPI from "@pushprotocol/restapi";
// import * as ethers from "ethers";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  // const [accounts, setAccounts] = useState<[] | null>(null);
  const [socialLogin, setSocialLogin] = useState(false);
  const [smartAccountAddress, setSmartAccountAddress] = useState("");
  const [userBalance, setUserBalance] = useState({ symbol: "USDT", amount: 0 });
  const [dappBalance, setDappBalance] = useState({ symbol: "USDT", amount: 0 });
  const tokenAddress = "0xeaBc4b91d9375796AA4F69cC764A4aB509080A58";
  const dappContractAddress = "0x682b1f3d1afa69ddfa5ff62c284894a19fd395b4";

  //push protocol
  const PK =
    "0x82bee5195d9eb5e65cf4fb74609a5b18c32fc196969aa7f6b2152d75fa74f71c"; // channel private key
  const Pkey = `0x82bee5195d9eb5e65cf4fb74609a5b18c32fc196969aa7f6b2152d75fa74f71c`;
  const signer = new ethers.Wallet(Pkey);

  //Add shardeum instead of polygon
  const activeChainId = ChainId.POLYGON_MUMBAI;

  //covalent
  const APIKEY = "ckey_65549b1692094628ad569b49e88";
  // const baseURL = "https://api.covalenthq.com/v1";
  // const blockchainId = "8080";
  // const demoAddress = "0x8B0550c6040Fe5c2653F3c5ED79E51c4EC42a8D3";

  // async function getWalletBalance(chainId, address) {
  //   const url = new URL(
  //     `${baseURL}/${chainId}/address/${address}/balances_v2/?key=${APIKEY}`
  //   );
  //   // const response = await fetch(url);
  //   // const result = await response.json();
  //   // const data = result.data;
  //   // console.log(data);
  //   // return data;

  //   fetch(url).then((resp)=> resp.json()).then(function(data){
  //     const res= data.data;
  //     console.log(res);
  //     return res;
  //   })
  // }
  function getData() {
    const address = "0x8B0550c6040Fe5c2653F3c5ED79E51c4EC42a8D3"; // example
    const chainId = "8080"; // Moonbase Alpha TestNet chain ID
    const url = new URL(
      `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/`
    );

    url.search = new URLSearchParams({
      key: APIKEY,
    });

    // use fetch API to get Covalent data
    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        const result = data.data;

        console.log(result);
        return result;
      });
  }
  useEffect(() => {
    // Example address request
    console.log("balances ", getData());
  });
  //push protocol
  const polly = "hey";
  const num = `${polly} is 5`;
  const sendNotification = async () => {
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, // target
        identityType: 2, // direct payload
        notification: {
          title: num,
          body: num,
        },
        payload: {
          title: num,
          body: `sample msg body`,
          cta: "",
          img: "",
        },
        recipients: "eip155:5:0x7e70A77d7977eCb3B00B961b801143a72f5516e4", // recipient address
        channel: "eip155:5:0x7e70A77d7977eCb3B00B961b801143a72f5516e4", // your channel address
        env: "staging",
      });

      // apiResponse?.status === 204, if sent successfully!
      console.log("API repsonse: ", apiResponse);
    } catch (err) {
      console.error("Error: ", err);
    }
  };
  let initWallet = async () => {
    console.log("init wallet");
    const socialLogin = new SocialLogin();
    await socialLogin.init(ethers.utils.hexValue(activeChainId));
    socialLogin.showConnectModal();
    setSocialLogin(socialLogin);
    console.log(socialLogin);
    if (socialLogin.provider) {
      getTokenBalances();
      setIsLogin(true);
    }
    return socialLogin;
  };

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
        },
      ],
    };

    const newProvider = new ethers.providers.Web3Provider(socialLogin.provider);

    let smartAccount = new SmartAccount(newProvider, options);
    smartAccount = await smartAccount.init();
    console.log(smartAccount);
  }

  async function getTokenBalances() {
    if (socialLogin?.provider) {
      const newProvider = new ethers.providers.Web3Provider(
        socialLogin.provider
      );

      const erc20Contract = new ethers.Contract(
        tokenAddress,
        erc20ABI,
        newProvider
      );
      const dappContract = new ethers.Contract(
        dappContractAddress,
        fundMeABI,
        newProvider
      );

      let smartAccount;
      await newProvider.listAccounts().then(async (accounts) => {
        console.log(accounts);
        smartAccount = accounts;
        setSmartAccountAddress(accounts);
      });

      console.log("smart account", smartAccount[0]);

      const smartContractBalance = await erc20Contract.balanceOf(
        smartAccount[0]
      );
      const smartContractSymbol = await erc20Contract.symbol();

      const dappBalance = await dappContract.balanceOf(
        smartAccount[0],
        tokenAddress
      );

      // console.log("dappBalance.toString()");
      // console.log(dappBalance.toString());
      setUserBalance({
        amount: smartContractBalance.toString(),
        symbol: smartContractSymbol,
      });
      setDappBalance({
        amount: dappBalance.toString(),
        symbol: smartContractSymbol,
      });
    } else {
      console.log("Social login is not defined");
    }
  }

  async function logout() {
    if (socialLogin) {
      await socialLogin.logout();
      socialLogin.hideWallet();
      setIsLogin(false);
      setSocialLogin(null);
    }
  }

  // async function sendGaslessTransaction() {
  //   console.log("yo");
  // }

  async function login() {
    try {
      if (socialLogin) {
        socialLogin.showWallet();
      } else {
        let socialLogin = await initWallet();
        socialLogin.showWallet();
        console.log("Social login is not defined");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <button onClick={sendNotification}>hhhhhh</button>
      {!isLogin && <button onClick={login}>Login</button>}

      {isLogin && (
        <div className="parent-container">
          <div>
            <button onClick={logout}>Logout</button>
          </div>
          <div className="column meta-info-container">
            <div className="row address-container">
              Smart Account: {smartAccountAddress}
            </div>
            {/* <div className='row balance-container'>
              <div className='scw-balance'>
                User Balance: {userBalance.amount} {userBalance.symbol}
              </div>
              <div className='dapp-balance'>
                Dapp Balance: {dappBalance.amount} {dappBalance.symbol}
              </div>
            </div> */}
          </div>
          {/* <div className='row action-container'>
            <div className='column action-container'>
              <h3>Action</h3>
              <div className='column'>
                <div className='gasless-action'>
                  <div className='block-heading'>Gasless Transactions</div>
                  <div>
                    <button className='action-button' onClick={sendGaslessTransaction} >Send Transaction</button>
                  </div>
                </div>
                <div className='user-paid-action'>
                  <div className='block-heading'>User Paid Transactions</div>
                  <div>
                    <button className='action-button'>Estimate Gas</button>
                    <button className='action-button'>Send Transaction</button>
                  </div>
                  <div>

                  </div>
                </div>
              </div>
            </div>
            <div className='column transaction-container'>
              <h3>Transactions</h3>
              <div className='transactions-body'>

              </div>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default App;
