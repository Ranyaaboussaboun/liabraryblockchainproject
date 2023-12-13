document.addEventListener('DOMContentLoaded', async () => {
    // Connect  Ganache
    const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

    // Get the contract instance
    try {
        const response = await fetch('./build/contracts/LibraryAccessControl.json');
        const { abi } = await response.json();

        const contractAddress = '0x3d0DDD0E78BDEC23f6A85d9b07Cc0299CB4A5a3e'; 
        const libraryContract = new web3.eth.Contract(abi, contractAddress);


        // Grant Access Form Submission
        const grantAccessForm = document.getElementById('grantAccessForm');
        const accessRightsDiv = document.getElementById('accessRights');

        grantAccessForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Get input value
            const userAddress = event.target.elements.userAddress.value;

            // Send transaction to grant access
            const accounts = await web3.eth.getAccounts();
            await libraryContract.methods.grantAccess(userAddress, true, true, false).send({ from: accounts[0] });
            // Wait for the transaction to be mined
            await transactionReceipt.wait(1);
            // Refresh access rights
            accessRightsDiv.innerHTML = await checkAccessRights(userAddress);
        });

        // Check Access Form Submission
        const checkAccessForm = document.getElementById('checkAccessForm');

        checkAccessForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Get input value
            const checkUserAddress = event.target.elements.checkUserAddress.value;

            // Display access rights
            accessRightsDiv.innerHTML = await checkAccessRights(checkUserAddress);
        });

        // Function to check access rights
        async function checkAccessRights(userAddress) {
            const access = await libraryContract.methods.checkAccess(userAddress).call();
            return `Access Rights: ${JSON.stringify(access)}`;
        }
    } catch (error) {
        console.error('Error fetching ABI:', error.message);
    }
});
