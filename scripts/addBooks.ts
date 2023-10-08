import { Book } from '../typechain';
import { ethers } from 'hardhat';

async function main() {
  // contract instance
  const book = await ethers.getContract<Book>('Book');

  let bookLength = await book.bookLength();
  console.log('Book Length  =', Number(bookLength));

  // get signers
  const [ admin ] = await ethers.getSigners();

  const addBook = await book
    .connect(admin)
    .addBook('book-2', "2023", "Agis Satria Mandala", {
      gasPrice: 2000000000, // 2 gwei
      gasLimit: 500000, // max: 19,000,000 gas
    });
  await addBook.wait();

  const getAll = await book
  .connect(admin)
  .getAllBook({
    gasPrice: 2000000000,
    gasLimit: 500000,
  });

  bookLength = await book.bookLength();
  console.log('Book Length  =', Number(bookLength));
  console.log(getAll);
}

main().catch((err) => {
  console.log('error =', err);
  process.exitCode = 1;
});