# Blockchain Academy - Project Voting dApp

A decentralized application for Nova SBE Blockchain Academy to submit and vote on group projects with ETH staking on Sepolia testnet.

## Features

- **Project Submission**: Submit your project with a 0.1 ETH stake
- **Voting**: Vote for your favorite projects (0.01 ETH per vote)
- **One vote per project**: Each wallet can vote once per project, but can vote for multiple projects
- **Prize Distribution**: Winner takes the prize pool after the deadline
- **Incentivized Distribution**: Non-winners who trigger distribution earn 10% of the prize pool

## Smart Contract

The `ProjectVoting.sol` contract handles all on-chain logic:

| Function | Description | Cost |
|----------|-------------|------|
| `submitProject(name, description)` | Submit a project | 0.1 ETH |
| `vote(projectId)` | Vote for a project | 0.01 ETH |
| `distributePrize()` | Distribute prize pool to winner | Free |

### Key Rules

- **Deadline**: February 12, 2025, 23:59 UTC
- **One submission per wallet**
- **One vote per wallet per project**
- **Prize Distribution**:
  - If winner triggers: 100% to winner
  - If non-winner triggers: 90% to winner, 10% to caller
- **Tie-breaker**: First submitted project wins

## Tech Stack

- **Smart Contract**: Solidity ^0.8.20
- **Frontend**: React + TypeScript + Vite
- **Web3**: wagmi v2 + viem
- **Styling**: Tailwind CSS v4
- **Network**: Sepolia Testnet

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask or another Web3 wallet
- Sepolia testnet ETH ([Faucet](https://sepoliafaucet.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/blockchainAcademy-vibecoding-session.git
cd blockchainAcademy-vibecoding-session

# Install frontend dependencies
cd frontend
npm install
```

### Local Development

```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
cd frontend
npm run build
```

## Deployment

### Smart Contract Deployment

1. **Using Remix IDE** (easiest):
   - Go to [Remix](https://remix.ethereum.org/)
   - Create a new file and paste the contents of `contracts/ProjectVoting.sol`
   - Compile with Solidity 0.8.20+
   - Deploy to Sepolia using "Injected Provider - MetaMask"
   - Copy the deployed contract address

2. **Update Frontend**:
   - Edit `frontend/src/config/contract.ts`
   - Replace `CONTRACT_ADDRESS` with your deployed address

### Frontend Deployment (GitHub Pages)

1. Push your code to the `main` branch
2. Go to repository Settings > Pages
3. Set Source to "GitHub Actions"
4. The workflow will automatically build and deploy on each push

The site will be available at: `https://YOUR_USERNAME.github.io/blockchainAcademy-vibecoding-session/`

## Project Structure

```
blockchainAcademy-vibecoding-session/
├── contracts/
│   └── ProjectVoting.sol       # Solidity smart contract
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── SubmitProject.tsx
│   │   │   ├── ProjectList.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── DistributePrize.tsx
│   │   │   └── ...
│   │   ├── hooks/              # Custom wagmi hooks
│   │   │   ├── useProjects.ts
│   │   │   ├── useSubmitProject.ts
│   │   │   ├── useVote.ts
│   │   │   └── useDistribute.ts
│   │   ├── config/             # Configuration
│   │   │   ├── wagmi.ts        # Wagmi client setup
│   │   │   └── contract.ts     # Contract address & ABI
│   │   └── utils/              # Utility functions
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment
└── README.md
```

## Contract Verification

After deploying, verify your contract on Etherscan:

1. Go to [Sepolia Etherscan](https://sepolia.etherscan.io/)
2. Find your contract address
3. Click "Verify and Publish"
4. Select:
   - Compiler: 0.8.20+
   - License: MIT
   - Optimization: Yes (if used)
5. Paste the contract source code

## Security Considerations

- The contract uses the Checks-Effects-Interactions pattern to prevent reentrancy
- Strict ETH amount checks prevent accidental overpayment
- Input validation on name (max 100 chars) and description (max 1000 chars)
- `prizeDistributed` flag prevents double distribution

## License

MIT

## Acknowledgments

Built for Nova SBE Blockchain Academy
