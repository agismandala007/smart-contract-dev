// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Book {
    address public admin = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    uint256 private isbnCounter;

    struct BookAtribut {
        bytes32 isbn;
        string title;
        uint year;
        string writter;
    }

    BookAtribut[] public books;
    mapping(bytes32 => uint) indexBooks;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Unautorize");
        _;
    }

    function generatorISBN() public returns (bytes32) {
        uint seed = isbnCounter + block.timestamp;
        bytes32 randomHash = keccak256(abi.encodePacked(seed));
        isbnCounter++;
        
        return randomHash;
    }

    function addBook (
        string calldata _title,
        uint _year,
        string calldata _writter
    ) public onlyAdmin {
        BookAtribut memory newBooks = BookAtribut({
            isbn: generatorISBN(),
            title: _title,
            year: _year,
            writter: _writter
        });

        books.push(newBooks);

        indexBooks[newBooks.isbn] = books.length;
    }

    function bookExist (bytes32 _isbn) public view returns (bool){
        return indexBooks[_isbn] != 0;
    }

    function getBook (bytes32 _isbn) public view returns(bytes32, string memory, uint , string memory) {
        require(books.length > 0);
        require(bookExist(_isbn), "Not Found");

        uint getIndex = indexBooks[_isbn] - 1;

        return (books[getIndex].isbn, books[getIndex].title, books[getIndex].year, books[getIndex].writter);
    }

    // function removeBook(string calldata _isbn) public onlyAdmin {
    //     require(books.length > 0);
    //     require(bookExist(_isbn), "not found");

    //     uint getIndex = indexBooks[_isbn];
    //     BookAtribut memory booksMove = books[books.length - 1];

    //     books[getIndex] = booksMove;
    //     books[getIndex].isbn = getIndex;

    //     delete indexBooks[_isbn];
    //     books.pop();
    // }
}