import { Book } from '../typechain';
import { ethers } from 'hardhat';

async function main() {
  const book = await ethers.getContract<Book>('Book');

  const [ admin ] = await ethers.getSigners();

  const updateBook = await book
    .connect(admin)
    .updateBook("0xd9e1324a9727a5aae58ce9e4b11d1107cf9888bdaeb365a265ece8bf1aec3224", "Tutorial Blockchain", 2022, "Agis", {
      gasPrice: 2000000000, // 2 gwei
      gasLimit: 500000, // max: 19,000,000 gas
    });
  await updateBook;

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