import { BigNumber, providers } from "ethers";

declare global {
  interface Window {
    ethereum: providers.ExternalProvider;
  }
}

export interface VoteEvent {
  id: BigNumber;
  author: string;
  title: string;
  description: string;
  candidates: Candidate[];
}

export interface Candidate {
  id: BigNumber;
  name: string;
  age: BigNumber;
  campaignPledge: string;
}

export interface VoteResult {
  adr: string;
  candidate: Candidate;
  eventId: BigNumber;
}
