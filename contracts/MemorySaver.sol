pragma solidity ^0.5.0;

contract MemorySaver {
	struct Memory {
		string title;
		string content;
		string hash;
		uint timestamp;
	}
	struct User {
	    uint count;
	    mapping(uint => Memory) memories;
	}
	mapping(address => User) users;

	function save(string memory _title, string memory _content, string memory _hash) public {
		Memory memory _mem = Memory(_title, _content, _hash, now);
	    uint _counter = users[msg.sender].count;
	    users[msg.sender].memories[_counter] = _mem;
	    users[msg.sender].count++;
	}

	function getMemory(uint _id) public view returns (string memory, string memory, string memory, uint) {
		Memory memory _mem = users[msg.sender].memories[_id];
	    return (_mem.title, _mem.content, _mem.hash, _mem.timestamp);
	}
	
	function getMemoryCount() public view returns(uint) {
	    return users[msg.sender].count;
	}
}
