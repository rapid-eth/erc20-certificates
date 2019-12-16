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

    // Override the redeemCertificate() function from core library to allow single certificates
    // to be redeemed multiple times...helps with testing, not for production use
    function redeemCertificate(bytes calldata _signature, bytes32 _certificateID) external
        returns (bool)
    {
        bytes32 hash = _getCertificateHash(_certificateID, msg.sender);
        require(_isDelegateSigned(hash, _signature, _certificateID), "Not Delegate Signed");
        
        // This line would prevent duplicate redemptions
        //require(!certificateTypes[_certificateID].claimed[msg.sender], "Cert already claimed");

        certificateTypes[_certificateID].claimed[msg.sender] = true;
        uint256 amount = certificateTypes[_certificateID].amount;
        _mint(msg.sender, amount);
        emit CertificateRedeemed(msg.sender, amount, _certificateID);
        return true;
    }

}