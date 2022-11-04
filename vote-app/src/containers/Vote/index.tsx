import React, { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import artifact from "../../abi/VoteStore.json";
import { contractAddress } from "../../constants/address";
import { useRouter } from "next/router";
import { VoteEvent, VoteResult } from "../../types/dapp";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Vote = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const contractRef = useRef<undefined | ethers.Contract>();
  const [voteEvent, setVoteEvent] = useState<undefined | VoteEvent>();
  const [voteResults, setVoteResults] = useState<VoteResult[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(eventId);
    try {
      // ブロックチェーンデータにアクセスするためのオブジェクト
      // const provider = new ethers.providers.JsonRpcBatchProvider();
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // ブロックチェーンにデプロイされたコントラクトを表現するオブジェクト
      const contract = new ethers.Contract(
        contractAddress,
        artifact.abi,
        provider
      );
      const contractWithSigner = contract.connect(signer);
      contractRef.current = contractWithSigner;
      getEvent();
      getAllVote();
    } catch (e) {
      console.error(e);
      window.alert(
        "MetaMask が接続されていません。\n拡張機能で MetaMask を導入し、画面左上の「コネクト」を押せば接続が完了します"
      );
    }
  }, []);

  const getEvent = async () => {
    console.log("eventId", eventId);
    if (!contractRef.current || typeof eventId !== "string") return;
    const event = await contractRef.current.getEvent(eventId);
    console.log(event);
    setVoteEvent(event);
  };

  const getAllVote = async () => {
    if (!contractRef.current || typeof eventId !== "string") return;
    const allVote = await contractRef.current.getAllVote();
    console.log(allVote);
    setVoteResults(allVote);
  };

  const vote = async (candidateId: number) => {
    if (!contractRef.current || typeof eventId !== "string") return;
    setLoading(true);
    try {
      await contractRef.current.createVote(Number(eventId), candidateId);
      setLoading(false);
      handleClickOpen();
      // 即時反映はされないけど、一応取得しておく
      getAllVote();
    } catch (e) {
      window.alert(
        "資金が足りませんでしたか？\nデモの管理者に資金を送って貰ってください。\n資金が十分にもかかわらずこのメッセージが出る場合は、Metamaskの設定からアカウントのリセットを行い、トランザクションの履歴をクリアしてください"
      );
      setLoading(false);
    }
  };

  const onClickConnect = async () => {
    if (window.hasOwnProperty("ethereum")) {
      // @ts-ignore
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(`Address is ${account}`);
    } else {
      window.alert("MetaMask を 拡張機能として登録してください");
    }
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
      <Button
        variant="contained"
        onClick={onClickConnect}
        sx={{ position: "fixed", top: 8, left: 8 }}
      >
        コネクト
      </Button>
      {isLoading && (
        <CircularProgress size={100} sx={{ position: "fixed", top: "50%" }} />
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"投票が完了しました"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`トランザクションの処理が完了し、ブロックが追加されるまで少々時間がかかります。（目安時間は MetaMask に表示されていた時間です）\n時々リロードしながらお待ちください。`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
      <Grid item>
        <Typography variant="h4" gutterBottom>
          投票会場
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" gutterBottom>
          候補者をクリックで投票
        </Typography>
      </Grid>
      <Grid item container spacing={2} justifyContent={"center"}>
        {voteEvent &&
          voteEvent.candidates.map((item) => {
            return (
              <Grid item key={item.id.toString()}>
                <Card
                  sx={{ maxWidth: 345 }}
                  onClick={() => {
                    vote(item.id.toNumber());
                  }}
                >
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {`${item.name}（${item.age}）`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.campaignPledge}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
      </Grid>
      <Grid item mt={8}>
        <Typography variant="h4" gutterBottom>
          開票結果
        </Typography>
      </Grid>
      <Grid item container spacing={4}>
        {voteResults.length > 0 &&
          voteResults.map((item, index) => {
            return (
              <Grid item container key={index}>
                <Grid item container>
                  <Grid item xs={2}>
                    <Typography variant="h6" gutterBottom>
                      {"候補者"}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="h6" gutterBottom>
                      {`${item.candidate.name}（${item.candidate.age}）`}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={2}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      color={"#757575"}
                    >
                      {"投票者"}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      color={"#757575"}
                    >
                      {item.adr}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default Vote;
