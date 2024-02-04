# CoinTracker Take Home

## Setup

### Install Dependencies

- In the client directory, run `yarn install` or `npm install` to install the client dependencies.
- In the server directory, run `yarn install` or `npm install` to install the server dependencies.

### Start the Server

- In the server directory, start the server by running `yarn start` or `npm start`.
- The server will start on port 4000.

### Start the Client

- In the client directory, start the client by running `yarn start` or `npm start`.
- The client will start on port 3000 and will communicate with the server via the API URL defined in the `REACT_APP_API_URL` environment variable.

## Design

### Requirements

- Create User Profiles
- Add/Remove wallet addresses
- Synchronize bitcoin wallet transactions for the addresses
- Retrieve the current balances and transactions for each address

### Architecture

[Architecture Diagram](https://excalidraw.com/#room=1bff8dfe982f39a4c778,wD6k3XqOBOJCOQ3Nf-VcXg)

#### Client

1. **Login Component:**
    - Accepts user credentials
    - Passes wallet data to Dashboard

2. **Dashboard Component:**
    - Primary user interface after login.
    - Displays overview of user's wallets
    - Allows adding/removing wallets
    - Shows wallet transaction history

    - **WalletList UI:**
        - Displays list of wallets with balances
        - Handles selection to view transactions
        - Sends selected wallet to TransactionList

    - **TransactionList UI:**
        - Displays paginated transactions
        - Handles pagination and fetching pages
        - Updates on new selected wallet from WalletList

    - **InputBar UI:**
        - Text input for new wallet address
        - Sends new addresses to controller

    - **Controller:**
        - Central component for app state and logic.
        - Makes API calls to backend
        - Manages state - wallets, transactions, loading status, errors
        - Passes data and actions to visual components

#### Server

1. **Backend API server:**
    - Handles API routes and requests
    - Makes calls to external blockchain APIs
    - Manages database for user and wallet data

### Data Model

The data model for the CoinTracker application revolves around user profiles, wallet addresses

- **User Profile:**
    The user profile contains basic information about the user and their preferences. Each user can have multiple wallet addresses associated with their profile
    - name: String (required) - The name of the user.
    - walletAddress: Array of Strings - An array containing the user's wallet addresses.

### API Specification

#### Routes

- GET /getWallets - Finds user by name and returns wallet address(es)
- POST /addWallet - Adds a wallet address to a user
- POST /removeWallet - Removes a wallet address from a user
- POST /getTransactions - Retrieves transactions for a given wallet address and page number

#### Error Responses

- 404 - Not Found
- 400 - Bad Request
- 500 - Internal Server Error

### Deep Dive

Some bitcoin wallets can contain thousands of transactions in their history. Rendering a component for each individual transaction would be inefficient. To optimize this, pagination was implemented for the transaction list. Only a small subset of transactions are fetched and rendered at a time. Offset-based pagination was chosen over cursor-based pagination. This matches the underlying blockchain API pagination, which uses offsets. Using offset pagination simplified syncing new data from the API. The frontend can track the last synced offset and increment it to fetch new transaction pages. With cursor-based pagination, maintaining position is more complex given the Blockchain API. By matching the offset-style pagination, the frontend can independently handle requesting new pages. The backend only needs to synchronize and retrieve the latest blockchain data.

### Future Improvement

- Loading Indicators (Shimmer Loading effect)
- Cache for Offline usage
- Background sync for wallets
- Handling Race condition for Pagination
