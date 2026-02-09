// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title ProjectVoting - Nova SBE Blockchain Academy Project Submission & Voting
/// @notice Submit projects with 0.1 ETH stake, vote with 0.01 ETH per vote, winner takes prize pool
contract ProjectVoting {
    // Constants
    uint256 public constant SUBMISSION_STAKE = 0.1 ether;
    uint256 public constant VOTE_COST = 0.01 ether;
    uint256 public constant DEADLINE = 1739404740; // Feb 12, 2025, 23:59:00 UTC (Lisbon time)

    // Project structure
    struct Project {
        uint256 id;
        address submitter;
        string name;
        string description;
        uint256 voteCount;
        uint256 submittedAt;
    }

    // Storage
    Project[] public projects;
    mapping(address => uint256) public submitterToProjectId; // 1-indexed, 0 = no submission
    mapping(address => mapping(uint256 => bool)) public hasVoted; // voter => projectId => voted
    bool public prizeDistributed;
    address public winner;

    // Events
    event ProjectSubmitted(
        uint256 indexed projectId,
        address indexed submitter,
        string name,
        uint256 timestamp
    );
    event VoteCast(
        uint256 indexed projectId,
        address indexed voter,
        uint256 newVoteCount
    );
    event PrizeDistributed(
        address indexed winner,
        address indexed caller,
        uint256 winnerAmount,
        uint256 callerReward
    );

    /// @notice Submit a project with 0.1 ETH stake
    /// @param _name Project name (max 100 characters)
    /// @param _description Project description (max 1000 characters)
    function submitProject(string calldata _name, string calldata _description) external payable {
        require(block.timestamp < DEADLINE, "Submissions closed");
        require(msg.value == SUBMISSION_STAKE, "Must stake exactly 0.1 ETH");
        require(submitterToProjectId[msg.sender] == 0, "Already submitted a project");
        require(bytes(_name).length > 0 && bytes(_name).length <= 100, "Invalid name length");
        require(bytes(_description).length > 0 && bytes(_description).length <= 1000, "Invalid description length");

        uint256 projectId = projects.length;
        projects.push(
            Project({
                id: projectId,
                submitter: msg.sender,
                name: _name,
                description: _description,
                voteCount: 0,
                submittedAt: block.timestamp
            })
        );

        submitterToProjectId[msg.sender] = projectId + 1; // 1-indexed
        emit ProjectSubmitted(projectId, msg.sender, _name, block.timestamp);
    }

    /// @notice Vote for a project with 0.01 ETH
    /// @param _projectId The ID of the project to vote for
    function vote(uint256 _projectId) external payable {
        require(block.timestamp < DEADLINE, "Voting closed");
        require(msg.value == VOTE_COST, "Must pay exactly 0.01 ETH to vote");
        require(_projectId < projects.length, "Project does not exist");
        require(!hasVoted[msg.sender][_projectId], "Already voted for this project");

        hasVoted[msg.sender][_projectId] = true;
        projects[_projectId].voteCount++;

        emit VoteCast(_projectId, msg.sender, projects[_projectId].voteCount);
    }

    /// @notice Distribute prize pool to winner after deadline
    /// @dev Anyone can call. Winner gets 100% if self-trigger, else 90% winner / 10% caller
    function distributePrize() external {
        require(block.timestamp >= DEADLINE, "Voting not ended yet");
        require(!prizeDistributed, "Prize already distributed");
        require(projects.length > 0, "No projects submitted");

        prizeDistributed = true;

        // Find winner (most votes, first submitted in case of tie)
        uint256 winningProjectId = 0;
        uint256 highestVotes = projects[0].voteCount;

        for (uint256 i = 1; i < projects.length; i++) {
            if (projects[i].voteCount > highestVotes) {
                highestVotes = projects[i].voteCount;
                winningProjectId = i;
            }
        }

        winner = projects[winningProjectId].submitter;
        uint256 totalPrize = address(this).balance;

        if (msg.sender == winner) {
            // Winner triggers: 100% to winner
            (bool success, ) = winner.call{value: totalPrize}("");
            require(success, "Transfer failed");
            emit PrizeDistributed(winner, msg.sender, totalPrize, 0);
        } else {
            // Non-winner triggers: 90% to winner, 10% to caller
            uint256 callerReward = totalPrize / 10;
            uint256 winnerAmount = totalPrize - callerReward;

            (bool success1, ) = winner.call{value: winnerAmount}("");
            require(success1, "Winner transfer failed");

            (bool success2, ) = msg.sender.call{value: callerReward}("");
            require(success2, "Caller transfer failed");

            emit PrizeDistributed(winner, msg.sender, winnerAmount, callerReward);
        }
    }

    // View functions

    /// @notice Get total number of projects
    function getProjectCount() external view returns (uint256) {
        return projects.length;
    }

    /// @notice Get a single project by ID
    function getProject(uint256 _projectId) external view returns (Project memory) {
        require(_projectId < projects.length, "Project does not exist");
        return projects[_projectId];
    }

    /// @notice Get all projects
    function getAllProjects() external view returns (Project[] memory) {
        return projects;
    }

    /// @notice Get total prize pool
    function getTotalPrizePool() external view returns (uint256) {
        return address(this).balance;
    }

    /// @notice Get seconds remaining until deadline
    function getTimeRemaining() external view returns (uint256) {
        if (block.timestamp >= DEADLINE) return 0;
        return DEADLINE - block.timestamp;
    }

    /// @notice Check if user has voted for a specific project
    function hasUserVotedForProject(address _user, uint256 _projectId) external view returns (bool) {
        return hasVoted[_user][_projectId];
    }

    /// @notice Get project ID for a submitter (returns 0 if none)
    function getUserProjectId(address _user) external view returns (uint256) {
        return submitterToProjectId[_user];
    }
}
