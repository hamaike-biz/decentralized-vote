import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { contractAddress } from "../../constants/address";
import artifact from "../../abi/VoteStore.json";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useContract from "../../hooks/useContract";

const EventCreate = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const contract: undefined | ethers.Contract = useContract(true);

  // useEffect(() => {
  //   // ブロックチェーンデータにアクセスするためのオブジェクト
  //   // const provider = new ethers.providers.JsonRpcBatchProvider();
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   // ブロックチェーンにデプロイされたコントラクトを表現するオブジェクト
  //   const contract = new ethers.Contract(
  //     contractAddress,
  //     artifact.abi,
  //     provider
  //   );
  //   const contractWithSigner = contract.connect(signer);
  //   contractRef.current = contractWithSigner;
  // }, []);

  const onSubmit = async () => {
    if (!contract) return;
    await contract.createEvent(title, description);
    router.push("/event/list");
  };

  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      spacing={2}
      padding={4}
    >
      <Grid item>
        <Typography variant="h4" gutterBottom>
          投票会作成画面
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          required
          id="outlined-required"
          label="タイトル"
          defaultValue="タイトル"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
      </Grid>
      <Grid item>
        <TextField
          required
          id="outlined-required"
          label="説明"
          defaultValue="説明"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
      </Grid>
      <Grid item mt={2}>
        <Button variant="contained" onClick={onSubmit}>
          登録
        </Button>
      </Grid>
    </Grid>
  );
};

export default EventCreate;
