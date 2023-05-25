const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js");



const pubkey = new PublicKey("3qfG4UWkWKSLmMNJHDVAi2bzSGiuG6e4XfoxRKEEz6AG");


const getWalletBalance = async () => {

    try {
        const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
        const walletBalance = await connection.getBalance(pubkey);
    
        console.log(
          `Wallet address is ${pubkey} and balance is ${walletBalance / 1000000000}`
        );
      } catch (err) {
        console.log(err);
      }
    };



const main = async () => {
    await getWalletBalance();
  };
  
  main();
