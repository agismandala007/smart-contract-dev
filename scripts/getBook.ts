import { Book } from '../typechain';
import { ethers } from 'hardhat';

async function main() {
  // contract instance
  const book = await ethers.getContract<Book>('Book');

  let bookLength = await book.bookLength();
  console.log('Book Length  =', Number(bookLength));

  // get signers
  const [ admin ] = await ethers.getSigners();

  const findBook = await book
    .connect(admin)
    .getBook("0xd9e1324a9727a5aae58ce9e4b11d1107cf9888bdaeb365a265ece8bf1aec3224", {
      gasPrice: 2000000000, // 2 gwei
      gasLimit: 500000, // max: 19,000,000 gas
      // nonce: 12 // transaction count
      // value: 1000000000000000000 // 1 ether = 1e18 wei
    });
  await findBook;

  console.log(findBook);

}

main().catch((err) => {
  console.log('error =', err);
  process.exitCode = 1;
});