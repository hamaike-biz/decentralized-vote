import { useEffect, MutableRefObject, useRef } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../constants/address";
import artifact from "../abi/VoteStore.json";

const useContract = (
  useSigner: boolean,
  callback?: (contract: ethers.Contract) => void
) => {
  const contractRef = useRef<undefined | ethers.Contract>();

  useEffect(() => {
    // ブロックチェーンデータにアクセスするためのオブジェクト
    // const provider = new ethers.providers.JsonRpcBatchProvider();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // ブロックチェーンにデプロイされたコントラクトを表現するオブジェクト
    const contract = new ethers.Contract(
      contractAddress,
      artifact.abi,
      provider
    );
    if (useSigner) {
      contractRef.current = contract.connect(signer);
    } else {
      contractRef.current = contract;
    }
    callback && callback(contractRef.current);
  }, []);

  return contractRef.current;
};

export default useContract;
