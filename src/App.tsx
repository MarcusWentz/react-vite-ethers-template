import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

// import React, {useState} from 'react'
import {ethers} from 'ethers'
import contractABI from './contracts/contractABI.json'

function App() {

  	// deploy simple storage contract and paste deployed contract address here. This value is local ganache chain
	let contractAddress = '0xeD62F27e9e886A27510Dc491F5530996719cEd3d';

	const baseSepoliaChainId = 84532;;

	if(window.ethereum === undefined){
		alert("Metamask is not detected. Install Metamask then try again.");
		window.location.reload();
	}

	const providerRead = new ethers.providers.Web3Provider(window.ethereum); //Imported ethers from index.html with "<script src="https://cdn.ethers.io/lib/ethers-5.6.umd.min.js" type="text/javascript"></script>".

	const contractRead = new ethers.Contract(contractAddress, contractABI, providerRead);

	// const signer = provider.getSigner(); //Do this when the user clicks "enableEthereumButton" which will call getAccount() to get the signer private key for the provider.  	

	// const providerRead = new ethers.providers.Web3Provider(window.ethereum); //Imported ethers from index.html with "<script src="https://cdn.ethers.io/lib/ethers-5.6.umd.min.js" type="text/javascript"></script>".

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('🦊 Connect Wallet');

	const [currentContractVal, setCurrentContractVal] = useState('Connect wallet then click button above');

	const [providerAccount, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	const connectWalletHandler = async () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(accounts => {
				accountChangedHandler(accounts[0]);
				setConnButtonText(accounts[0].substr(0,5) + "..." +  accounts[0].substr(38,4) );
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

			// let chainId = await getChainIdConnected();
			// alert(JSON.stringify(chainId))

			if(window.ethereum.networkVersion != baseSepoliaChainId){
				// alert("You are not on the Goerli Testnet! Please switch to Goerli and refresh page.")
				try{
				  await window.ethereum.request({
					  method: "wallet_switchEthereumChain",
					  params: [{
              chainId: "0x" + baseSepoliaChainId.toString(16) //Convert decimal to hex string.
            }]
					})
				//   location.reload(); 
					window.location.reload();
				  // alert("Failed to add the network at chainId " + baseSepoliaChainId + " with wallet_addEthereumChain request. Add the network with https://chainlist.org/ or do it manually. Error log: " + error.message)
				} catch (error) {
				  alert("Failed to add the network at chainId " + baseSepoliaChainId + " with wallet_addEthereumChain request. Add the network with https://chainlist.org/ or do it manually. Error log: " + error.message)
				}
			  }

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, contractABI, tempSigner);
		setContract(tempContract);	
	}

	const setHandler = (event) => {

		event.preventDefault(); //Keep this or else the page will refresh.

		if(event.target.setText.value === "") {
			alert("Enter a number.");
			return;
		}
		if(contract === null) {
			alert("Connect your wallet.");
			return;
		}

		contract.set(event.target.setText.value)
		.then(tx => {
			console.log("Tx submitted: " + tx.hash)
		})
		.catch(e => {
			 if (e.code === 4001){
				 alert("Transaction request failed.")
			 } 
		});
		
	}

	// const getCurrentVal = async () => {
	// 	try{
	// 		let val = await contract.storedData();
	// 		setCurrentContractVal(val.toNumber());
	// 	} catch {
	// 		alert("Connect your wallet first.")
	// 	}
	// }

	if(window.ethereum.networkVersion == baseSepoliaChainId){
		getStoredData();
	}

	async function getStoredData() {
		let storedDataCallValue = await contractRead.storedData()
		if(storedDataCallValue.toNumber() === undefined){
			setCurrentContractVal("Install Metamask and select Goerli Testnet to have a Web3 provider to read blockchain data.");
		}
		else{
			setCurrentContractVal(storedDataCallValue.toNumber());
		}
	  }
	
	// async function getChainIdConnected() {

	// 	const connectedNetworkObject = await providerRead.getNetwork();
	// 	const chainIdConnected = connectedNetworkObject.chainId;
	// 	return chainIdConnected
	  
	// }

	contractRead.on("setEvent", () => {

		getStoredData()
	  
	});

	return (
		<div>
		<h4> </h4>
			<button className="button buttonConnectMetamask" onClick={connectWalletHandler}>{connButtonText}</button>
			<div>
			<h5> storedData(): </h5>
			{currentContractVal}
			<h4> </h4>
			</div>
			<form onSubmit={setHandler}>
				<button className="button buttonHighContrast" type={"submit"}> set(uint256 x) </button>
				<h4> </h4>
				<input id="setText" type="text" placeholder="input uint256 value"/>
			</form>
			<h4> </h4>
			{errorMessage}
			<h4> </h4>
			<form action="https://github.com/MarcusWentz/react-ethers-template">
				<input className="button buttonHighContrast" type="submit" value="GitHub" />
			</form>
		</div>
	);

  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App
