import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { BigNumber, ethers } from "ethers";
import Button from "@mui/material/Button";
import { VoteEvent } from "../../types/dapp";
import useContract from "../../hooks/useContract";

const EventList = () => {
  const router = useRouter();
  const [events, setEvents] = useState<VoteEvent[]>([]);

  const getAllEvents = async (contract: ethers.Contract) => {
    const allEvents = await contract.getAllEvent();
    console.log(allEvents);
    setEvents(allEvents);
  };

  const contract: undefined | ethers.Contract = useContract(true, getAllEvents);

  const onClickCreate = () => {
    router.push("/event/create");
  };

  const onClickEdit = (eventId: number) => {
    router.push({
      pathname: "/event/detail",
      query: {
        eventId: eventId,
      },
    });
  };

  const moveToVote = (eventId: number) => {
    router.push({
      pathname: "/vote",
      query: {
        eventId: eventId,
      },
    });
  };

  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      spacing={4}
      padding={4}
    >
      <Grid item>
        <Typography variant="h4" gutterBottom>
          投票会一覧画面
        </Typography>
      </Grid>
      <Grid container item spacing={4}>
        {events.map((item) => {
          return (
            <Grid
              container
              item
              key={item.author}
              flexDirection={"row"}
              justifyContent={"flex-end"}
              alignItems={"flex-end"}
            >
              <Grid container item flexDirection={"column"} xs={8}>
                <Grid item>
                  <Typography variant="h6" gutterBottom>
                    {`${item.title}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" gutterBottom>
                    {`${item.description}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" gutterBottom>
                    {`作成者：${item.author}`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  onClick={() => moveToVote(item.id.toNumber())}
                >
                  投票画面へ移動
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  onClick={() => onClickEdit(item.id.toNumber())}
                >
                  編集
                </Button>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <Grid container item>
        <Grid item mt={2}>
          <Button variant="contained" onClick={onClickCreate}>
            投票会の新規登録
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EventList;
