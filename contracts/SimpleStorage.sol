pragma solidity ^0.5.0;

contract StorageSafe {
  mapping(address => string) hashes;
  

  function set(string _hash) public {
    hashes[msg.sender] = _hash;
  }

  function get() public view returns (string) {
    return hashes[msg.sender];
  }
}
