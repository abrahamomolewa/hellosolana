const  {
    getHashedName,
    getNameAccountKey,
    NameRegistryState
}  = require("@solana/spl-name-service")

const {
    Connection,
    PublicKey,
    ClusterApiUrl,
    clusterApiUrl
} = require("@solana/web3.js") 

const SOL_TLD_AUTHORITY = new PublicKey(
    "58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx"
);
const accountName = "knoxtrades.sol"

const getDomainKey = async (domain) => {
     let  hashedDomain = await getHashedName(domain);
     let inputDomainKey = await getNameAccountKey(
        hashedDomain,
        undefined,
        SOL_TLD_AUTHORITY
     ); 

     return { inputDomainKey: inputDomainKey, hashedINputname: hashedDomain }
}

const main = async () => { 

    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

    const {inputDomainKey} = await getDomainKey(accountName.replace(".sol", ""));
    
    const registry = await NameRegistryState.retrieve(connection, inputDomainKey);

    console.log(registry.owner.toBase58())

}
main() 