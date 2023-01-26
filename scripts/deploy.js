const hre = require("hardhat");

async function main() {
    // const [deployer, tipper1, tipper2] = await hre.ethers.getSigners();

    const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    const buyMeACoffee = await BuyMeACoffee.deploy();

    await buyMeACoffee.deployed();

    console.log("\n === Contract deployed === \n");
    console.log("Contract address: ", buyMeACoffee.address,);
    // console.log("Contract balance: ", hre.ethers.utils.formatEther(await ethers.provider.getBalance(buyMeACoffee.address)));
    // console.log("Owner: ", await deployer.getAddress(), " :: ", hre.ethers.utils.formatEther(await deployer.getBalance()))
    // console.log("Tipper 1: ", await tipper1.getAddress(), " :: ", hre.ethers.utils.formatEther(await tipper1.getBalance()))
    // console.log("Tipper 2: ", await tipper2.getAddress(), " :: ", hre.ethers.utils.formatEther(await tipper2.getBalance()))

    // const txn1 = await buyMeACoffee.connect(tipper1).buyCoffee("You do great work", "Shikhar", { value: hre.ethers.utils.parseEther("100") })
    // console.log("\nTxn completed: ", txn1.hash)
    // console.log("Contract balance: ", hre.ethers.utils.formatEther(await ethers.provider.getBalance(buyMeACoffee.address)));
    // console.log("Owner: ", await deployer.getAddress(), " :: ", hre.ethers.utils.formatEther(await deployer.getBalance()))
    // console.log("Tipper 1: ", await tipper1.getAddress(), " :: ", hre.ethers.utils.formatEther(await tipper1.getBalance()))
    // console.log("Tipper 2: ", await tipper2.getAddress(), " :: ", hre.ethers.utils.formatEther(await tipper2.getBalance()))

    // const txn2 = await buyMeACoffee.connect(tipper2).buyCoffee("You do great work", "Shikhar", { value: hre.ethers.utils.parseEther("100") })
    // console.log("\nTxn completed: ", txn2.hash)
    // console.log("Contract balance: ", hre.ethers.utils.formatEther(await ethers.provider.getBalance(buyMeACoffee.address)));
    // console.log("Owner: ", await deployer.getAddress(), " :: ", hre.ethers.utils.formatEther(await deployer.getBalance()))
    // console.log("Tipper 1: ", await tipper1.getAddress(), " :: ", hre.ethers.utils.formatEther(await tipper1.getBalance()))
    // console.log("Tipper 2: ", await tipper2.getAddress(), " :: ", hre.ethers.utils.formatEther(await tipper2.getBalance()))

    // buyMeACoffee.on("NewTip", (tipper, tip, timestamp) => {
    //     console.log("==========\nNew tip from: ", tipper, " of: ", hre.ethers.utils.formatEther(tip), " at: " + timestamp);
    // })


    // const tips = await buyMeACoffee.connect(deployer).getTips();
    // console.log(tips)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


const DeployedAddress = "0xFD8022dc2b0E832ffFBfc8D494fdeab9E63f8f91"