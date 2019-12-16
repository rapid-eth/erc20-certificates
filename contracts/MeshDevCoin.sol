pragma solidity ^0.5.0;

import "./ERC20Certificate.sol";
import "./math/SafeMath.sol";

/**
 * @dev Implementation of `ERC20Certificate`
 */
contract MeshDevCoin is ERC20Certificate  {

    using SafeMath for uint256;

    string public name;
    uint8 public decimals;
    string public symbol;
    
    constructor
    (
        string  memory _tokenName,
        string memory _tokenSymbol,
        uint8   _decimalUnits,
        address _owner
    )
     public  {
        name = _tokenName;
        symbol = _tokenSymbol;
        decimals = _decimalUnits;
        condenserDelegates[_owner] = true;
        owner = _owner;
    }


    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to,_amount);
    }
}