const {
    Connection,
    PublicKey,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
} = require("@solana/web3.js")


const tokenProgram = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';  

const getTokens = async () => {
    try {
      const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed")
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(new PublicKey("31M5NiFDUufXjWVPw4AC2L1bckfkZLLL7cwWGHHeSBBR"),
      { 
        programId: new PublicKey(tokenProgram)
    })
    const nonZeroAccounts = tokenAccounts?.value?.filter(
        (Obj) => Obj.account.data.parsed.info.tokenAmount.uiAmount > 0
    );
    console.log(nonZeroAccounts);
    }catch(err) {
        console.log(err); 
    } 
}    

getTokens();

