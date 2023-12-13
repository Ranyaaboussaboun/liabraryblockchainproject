
pragma solidity ^0.5.16;
contract LibraryAccessControl {
    struct User {
        bool hasReadAccess;
        bool hasWriteAccess;
        bool hasModifyAccess;
    }

    mapping(address => User) public users; /*  associates each user's Ethereum address with a User struct that contains boolean flags for read, write, and modify access*/

/*Allows the contract owner to grant or modify access rights for a specific use*/
   
    function grantAccess(address user, bool read, bool write, bool modify) public {
        users[user] = User({
            hasReadAccess: read,
            hasWriteAccess: write,
            hasModifyAccess: modify
        });
    }
/*whether the user has read, write, and modify access*/
    function checkAccess(address user) view public returns (bool, bool, bool) {
        User memory currentUser = users[user];
        return (currentUser.hasReadAccess, currentUser.hasWriteAccess, currentUser.hasModifyAccess);
    }
}
