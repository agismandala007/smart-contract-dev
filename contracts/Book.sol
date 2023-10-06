// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Book {
    address public admin = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

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

    function generatorISBN(
        string calldata _title
    ) public pure returns (bytes32) {
        bytes32 randomIsdn = keccak256(abi.encodePacked(_title));

        return randomIsdn;
    }

    function addBook(
        string calldata _title,
        uint _year,
        string calldata _writter
    ) public onlyAdmin {
        BookAtribut memory newBooks = BookAtribut({
            isbn: generatorISBN(_title),
            title: _title,
            year: _year,
            writter: _writter
        });

        books.push(newBooks);

        indexBooks[newBooks.isbn] = books.length;
    }

    function bookExist(bytes32 _isbn) public view returns (bool) {
        return indexBooks[_isbn] != 0;
    }

    function getBook(
        bytes32 _isbn
    ) public view returns (bytes32, string memory, uint, string memory) {
        require(bookExist(_isbn), "Not Found");

        uint getIndex = indexBooks[_isbn] - 1;

        return (
            books[getIndex].isbn,
            books[getIndex].title,
            books[getIndex].year,
            books[getIndex].writter
        );
    }

    function removeBook(bytes32 _isbn) public onlyAdmin {
        require(bookExist(_isbn), "Not Found");

        uint getIndex = indexBooks[_isbn] - 1;
        BookAtribut memory lastBook = books[books.length - 1];

        books[getIndex] = lastBook;
        indexBooks[lastBook.isbn] = getIndex + 1;

        delete indexBooks[_isbn];
        books.pop();
    }

    function updateBook(
        bytes32 _isbn,
        string calldata _title,
        uint _year,
        string calldata _writter
    ) public onlyAdmin {
        require(bookExist(_isbn), "Not Found");

        uint getIndex = indexBooks[_isbn] - 1;

        books[getIndex] = BookAtribut({
            isbn: generatorISBN(_title),
            title: _title,
            year: _year,
            writter: _writter
        });

        indexBooks[books[getIndex].isbn] = getIndex + 1;
        delete indexBooks[_isbn];
    }
}
