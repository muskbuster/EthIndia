import React, {useState} from 'react';
import {ChainId} from "@biconomy/core-types";
import {ethers} from "ethers";
import SocialLogin from "@biconomy/web3-auth";

function Login() {

  const [isLogin, setIsLogin] = useState(false);
  const [socialLogin, setSocialLogin] = useState(false);

  let initWallet = async () => {
    console.log("init wallet");
    const socialLogin = new SocialLogin();
    await socialLogin.init(ethers.utils.hexValue(activeChainId));
    socialLogin.showConnectModal();
    setSocialLogin(socialLogin);
    console.log(socialLogin)
    if (socialLogin.provider) {
      getTokenBalances();
      setIsLogin(true);
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


  return (
    <div>
      {!isLogin &&
        <button onClick={login}>Login</button>
      }

      {isLogin &&
        <div className='parent-container'>
          <div>
            <button onClick={logout}>Logout</button>
          </div>
          <div className='column meta-info-container'>
            <div className='row address-container'>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Login