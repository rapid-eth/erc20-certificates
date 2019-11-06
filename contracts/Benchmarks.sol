pragma solidity ^0.5.0;

/**
 * @dev Implementation of `ERC20Certificate`
 */
contract Benchmarks {

    mapping (bytes32 => bool) public dummy;

    address public compareAddress;

    function setCompareAddress(address a) public {
        compareAddress = a;
    }

    function singleRecover(bytes32 hash, uint8 _v, bytes32 _r, bytes32 _s) public {
        address a = ecrecover(hash, _v, _r, _s);
        if (a == compareAddress) {
            dummy[hash] = true;
        }
    }


    function singleRecoverMultiWrite(bytes32 hash, uint8 _v, bytes32 _r, bytes32 _s, bytes32[] memory multiHashes) public {
        address a = ecrecover(hash, _v, _r, _s);
        if (a == compareAddress) {
            for (uint8 i = 0; i < multiHashes.length; i++) {
                dummy[multiHashes[i]] = true;
            }
        }
    }

    function multiRecover(bytes32[] memory hash, uint8[] memory _v, bytes32[] memory _r, bytes32[] memory _s) public {
        for (uint8 i = 0; i < hash.length; i++) {
            address a = ecrecover(hash[i], _v[i], _r[i], _s[i]);
            if (a == compareAddress) {
                dummy[hash[i]] = true;
            }
        }
    }




    function recover(bytes32 hash, uint8 _v, bytes32 _r, bytes32 _s) public
    pure
    returns (address) {
        return ecrecover(hash, _v, _r, _s);
    }


    function multiple(bytes32[] memory hash, uint8[] memory _v, bytes32[] memory _r, bytes32[] memory _s) public
    pure
    returns (address)
    {
        address x;
        for (uint8 i = 0; i < hash.length; i++) {
            x = ecrecover(hash[i], _v[i], _r[i], _s[i]);
        }
        return x;
    }

    function toEthSignedMessageHash(bytes32 hash)
        public
        pure
        returns (bytes32)
    {
        // 32 is the length in bytes of hash,
        // enforced by the type signature above
        return keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
        );
    }
}