const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js");


const devkeys = new Keypair();
const pubkey = new PublicKey(devkeys._keypair.publicKey).toString();
const privkey = devkeys.secretKey;

const getWalletBalance = async () => {

    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(privkey);
        const walletBalance = await connection.getBalance(myWallet.publicKey);
    
        console.log(
          `Wallet address is ${myWallet.publicKey.toString()} and balance is ${walletBalance}`
        );
      } catch (err) {
        console.log(err);
      }
    };

    const requestAirdrop = async () => {
        try {
          const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
          const myWallet = await Keypair.fromSecretKey(privkey);
          const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(myWallet.publicKey),
            5 * LAMPORTS_PER_SOL
          );


 const latestBlockHash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: fromAirDropSignature,
    });
  } catch (err) {
    console.log(err);
  }
};

const main = async () => {
    await getWalletBalance();
    await requestAirdrop();
    await getWalletBalance();
  };
  
  main();
