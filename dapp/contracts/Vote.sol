// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract VoteStore {
    receive() external payable {
        // TODO: 後で使い方を調べる
    }

    fallback() external payable {
        // TODO: 後で使い方を調べる
    }

    event AddedVote(uint id, uint _eventId, uint _candidateId);
    event CreatedEvent(uint id, string title, string description);
    event AddedCandidate(string name, uint age, string campaignPledge);

    struct Event {
        uint id;
        address author;
        string title;
        string description;
        Candidate[] candidates;
    }

    struct Candidate {
        uint id;
        string name;
        uint age;
        string campaignPledge;
    }

    struct Vote {
        address adr;
        uint eventId;
        Candidate candidate;
    }

    Event[] public events;
    Vote[] public voteList;

    function createVote(uint _eventId, uint _candidateId) public {
        Candidate[] storage candidates = events[_eventId].candidates;
        Vote memory item = Vote(msg.sender, _eventId, candidates[_candidateId]);
        voteList.push(item);
        uint id = voteList.length - 1;
        emit AddedVote(id, _eventId, _candidateId);
    }

    function createEvent(string memory _title, string memory _description) public {
        Event storage item = events.push();
        item.id = events.length - 1;
        item.title = _title;
        item.description = _description;
        item.author = msg.sender;
        emit CreatedEvent(events.length - 1, _title, _description);
    }

    function addCandidate(uint _eventId, string memory _name, uint _age, string memory _campaignPledge) public {
        Candidate[] storage candidates = events[_eventId].candidates;
        Candidate storage candidate = candidates.push();
        candidate.name = _name;
        candidate.age = _age;
        candidate.campaignPledge = _campaignPledge;
        candidate.id = candidates.length - 1;
        emit AddedCandidate(_name, _age, _campaignPledge);
    }

    // 自動生成される getter は 全部を返してくれる事はないので、全部欲しければ自前で getter を作る必要がある
    function getAllVote() public view returns (Vote[] memory) {
        return voteList;
    }

    function getAllEvent() public view returns (Event[] memory){
        return events;
    }

    function getEvent(uint _eventId) public view returns (Event memory) {
        return events[_eventId];
    }
}

//contract Lock {
//    uint public unlockTime;
//    address payable public owner;
//
//    event Withdrawal(uint amount, uint when);
//
//    constructor(uint _unlockTime) payable {
//        require(
//            block.timestamp < _unlockTime,
//            "Unlock time should be in the future"
//        );
//
//        unlockTime = _unlockTime;
//        owner = payable(msg.sender);
//    }
//
//    function withdraw() public {
//        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
//        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
//
//        require(block.timestamp >= unlockTime, "You can't withdraw yet");
//        require(msg.sender == owner, "You aren't the owner");
//
//        emit Withdrawal(address(this).balance, block.timestamp);
//
//        owner.transfer(address(this).balance);
//    }
//}
