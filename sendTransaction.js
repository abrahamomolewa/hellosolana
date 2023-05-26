 const {
Connection,
Keypair,
PublicKey,
clusterApiUrl,
Transaction,
sendAndConfirmTransaction,
SystemProgram,
LAMPORTS_PER_SOL
 } = require("@solana/web3.js")


 const fromwallet = new Keypair();

 const toWallet = new Keypair();

 const requestDevAirdrop = async (fromwalletParam) => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const fromPubkey = new PublicKey(fromwalletParam._keypair.publicKey);
    const requestSignature = await connection.requestAirdrop(fromPubkey, 1 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(requestSignature);

    } catch (err) {
        console.log(err);
    }
 };

 const transferSol = async (fromwalletParam, towalletparam, amount) => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const fromPubKey = new PublicKey(fromwalletParam._keypair.publicKey);
      const toPubKey = new PublicKey(towalletparam._keypair.publicKey);


        const txn = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: fromPubKey,
              toPubkey: toPubKey,
              lamports: amount * LAMPORTS_PER_SOL,
            })
          );
      
          const sig = await sendAndConfirmTransaction(connection, txn, [fromwalletParam]);
          console.log(sig);
          return sig;
        } catch (err) {
          console.log(err);
        }
      };

 const getWalletbalance = async (fromwalletParam) => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const fromPubkey = new PublicKey(fromwalletParam._keypair.publicKey);
  
    const balance = await connection.getBalance(fromPubkey);
    console.log(balance);
    return balance / LAMPORTS_PER_SOL;
  };
  

 
const main = async (fromwalletParam, towalletparam, amount) => {
    await getWalletbalance(fromwalletParam); // balance should be zero
    await requestDevAirdrop(fromwalletParam);
    await getWalletbalance(fromwalletParam); // balance should be 1 billion lamports
    await transferSol(fromwalletParam, towalletparam, amount);
    await getWalletbalance(fromwalletParam);
  };
  
  main(fromwallet, toWallet, 0.5);