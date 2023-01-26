// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract BuyMeACoffee {
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    event NewTip (
        address tipper,
        uint tip,
        uint256 timestamp
    );

    // Function Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller must be owner");
        _;
    }

    tip[] tips;

    struct tip {
        address tipper;
        uint256 timestamp;
        string name;
        string message;
        uint256 tip;
    }

    function buyCoffee(string memory _message, string memory _name) public payable {
        require(msg.value > 0, "Tip should be greater than 0");

        tips.push(tip(
            msg.sender,
            block.timestamp,
            _name, 
            _message,
            msg.value
        ));

        emit NewTip(msg.sender, msg.value, block.timestamp);
    }

    function withdrawFunds() public payable onlyOwner{
        owner.transfer(address(this).balance);
    }

    function getTips() public view returns(tip [] memory) {
        return tips;
    }
}
