import { Book } from '../typechain';
import { ethers } from 'hardhat';

async function main() {
  const book = await ethers.getContract<Book>('Book');

  const [ admin ] = await ethers.getSigners();

  const removeBook = await book
    .connect(admin)
    .removeBook("0xd2cefac86fc46206fc7b324ac406042437b7e095dc51a19754a8190633f6c48e", {
      gasPrice: 2000000000, // 2 gwei
      gasLimit: 500000, // max: 19,000,000 gas
    });
  await removeBook;

  const getBook = await book
  .connect(admin)
  .getAllBook({
    gasPrice: 2000000000, // 2 gwei
    gasLimit: 500000, // max: 19,000,000 gas
  });

  console.log(getBook);

}

main().catch((err) => {
  console.log('error =', err);
  process.exitCode = 1;
});