import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";


const func: DeployFunction = async ({
  deployments,
  ethers,
}: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments;
  const accounts = await ethers.getSigners();

  const deployer = accounts[0];
  console.log("Book", deployer.address);

  const deployBook = await deploy("Book", {
    contract: "Book",
    from: deployer.address,
    gasLimit: 4000000,
    args: [],
  });
};

func.tags = ["Book"];

export default func;
