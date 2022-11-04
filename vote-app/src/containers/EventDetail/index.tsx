import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ethers } from "ethers";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { VoteEvent } from "../../types/dapp";
import useContract from "../../hooks/useContract";

const EventDetail = () => {
  const router = useRouter();
  const { eventId } = router.query;

  const getEvent = async (contract: ethers.Contract) => {
    if (typeof eventId !== "string") return;
    const event = await contract.getEvent(eventId);
    console.log(event);
    setVoteEvent(event);
  };

  const contract: undefined | ethers.Contract = useContract(true, getEvent);
  const [name, setName] = useState("");
  const [age, setAge] = useState("20");
  const [campaignPledge, setCampaignPledge] = useState("公約を記入");
  const [voteEvent, setVoteEvent] = useState<undefined | VoteEvent>();

  const onSubmit = async () => {
    if (!contract || typeof eventId !== "string") return;
    await contract.addCandidate(eventId, name, age, campaignPledge);
    resetState();
    getEvent(contract);
  };

  const resetState = () => {
    setName("");
    setAge("20");
    setCampaignPledge("公約を記入");
  };

  const returnToList = () => {
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
          投票会詳細画面
        </Typography>
      </Grid>
      {voteEvent && (
        <Grid item container flexDirection={"column"}>
          <Grid item>
            <Typography variant="h5" gutterBottom>
              {voteEvent.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              {voteEvent.description}
            </Typography>
          </Grid>
          <Grid item container spacing={2}>
            {voteEvent.candidates.map((item) => {
              return (
                <Grid item container flexDirection={"column"}>
                  <Grid item>
                    <Typography variant="subtitle1" gutterBottom>
                      {`${item.name}（${item.age}）`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2" gutterBottom>
                      {item.campaignPledge}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}
      <Grid item>
        <TextField
          required
          id="outlined-required"
          label="名前"
          defaultValue="名前"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
      </Grid>
      <Grid item>
        <TextField
          required
          id="outlined-required"
          label="年齢"
          defaultValue="年齢"
          onChange={(e) => {
            setAge(e.target.value);
          }}
          value={age}
        />
      </Grid>
      <Grid item>
        <TextField
          required
          id="outlined-required"
          label="公約"
          defaultValue="公約"
          onChange={(e) => {
            setCampaignPledge(e.target.value);
          }}
          value={campaignPledge}
        />
      </Grid>
      <Grid item container justifyContent={"center"} spacing={2}>
        <Grid item mt={2}>
          <Button variant="contained" onClick={onSubmit}>
            候補者を追加
          </Button>
        </Grid>
        <Grid item mt={2}>
          <Button variant="outlined" onClick={returnToList}>
            一覧に戻る
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EventDetail;
