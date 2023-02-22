
import SimpleStorage from "./contracts/SimpleStorage.json"
import Web3 from "web3";
import { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState({web3:null, contract:null});
  const [data, setData] = useState("nil");

  useEffect(()=> {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1.7545")
    async function template(){
      const web3 = new Web3(provider);
      const network = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[network];
      console.log(deployedNetwork.address)
      //console.log(web3)
      const contract = new web3.eth.contract(SimpleStorage.abi, deployedNetwork.address)
      console.log(contract)

      setState({web3:web3, contract:contract});

    }
     provider && template();
  }, [])
  useEffect(()=>{
    const{contract} = state;
    async function readData(){

      const data = await contract.methods.getter().call();
      setData(data);

    }
    contract && readData();

  },[state])
  async function writeData (){
    const {contract} = state;
    const data = document.querySelector("#value").value;
    await contract.methods.setter(data).send({from:"0x686c626E48bfC5DC98a30a9992897766fed4Abd3"})
    window.location.reload();
  }

 console.log(state)
      return (
    
      <div id="App">
        <div className="container">
         Stephan is :{data}
        </div>
        <button onClick={writeData}>Change data</button>
      </div>
    
  );
}

export default App;
