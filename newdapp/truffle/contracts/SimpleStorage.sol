// SPDX-License-Identifier: MIT
pragma solidity >=0.5.22 <0.9.0;

contract SimpleStorage {
  uint256 a;

  function setter(uint _a) public {
    a = _a;
  }

  function getter() public view returns (uint256){
    return a;
  }
}
