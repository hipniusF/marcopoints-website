import abi from './assets/mPTabi.js';

const autoInstallBtn = document.querySelector('#clear-install');
// if (navigator.language.includes('es') && !location.href.includes('es')) location.href = '/es/';

// VARIABLES
// ERC20 token variables
const tokenAddress = '0xE155F3c5d5ADC7e3d82F1288f19b45D987e067a1';
const tokenSymbol = 'mPT';
const tokenDecimals = 18;
const tokenImage = 'https://marcopg.com/mpt.png';

// Network variables
const chainId = '0x313';
const blockExplorerUrls = ['https://explore.deveth.org/'];
const nativeCurrency = {
	name: 'devETH',
	symbol: 'dTH',
	decimals: 18
};
const chainName = 'devETH';
const rpcUrls = ['https://rpc.deveth.org'];

document.querySelector('span.contractAddr').textContent = tokenAddress;
document.querySelector('span.symbol').textContent = tokenSymbol;
document.querySelector('span.decimals').textContent = tokenDecimals;

(async () => {
	if (!window.ethereum) {
		document.querySelector('span.total-supply').textContent = 'you need metamask for this';
		return;
	}
	const web3 = new Web3(ethereum);

	const contract = new web3.eth.Contract(abi, tokenAddress);
	const weiSupply = await contract.methods.totalSupply().call();
	const supply = await web3.utils.fromWei(weiSupply);

	document.querySelector('span.total-supply').textContent = supply + ' mPT';
})();

autoInstallBtn.onclick = async () => {
	if (!window.ethereum) {
		autoInstallBtn.textContent = 'Metamask extension not found...';
		return;
	}
	if (window.ethereum.chainId !== chainId) {
		const addEthereumChainParameter = {
			chainId: chainId,
			blockExplorerUrls: blockExplorerUrls,
			nativeCurrency: nativeCurrency,
			chainName: chainName,
			rpcUrls: rpcUrls
		};
		await ethereum.request({
			method: 'wallet_addEthereumChain',
			params: [addEthereumChainParameter]
		});
	}
	await ethereum.request({
		method: 'wallet_watchAsset',
		params: {
			type: 'ERC20',
			options: {
				address: tokenAddress,
				symbol: tokenSymbol,
				decimals: tokenDecimals,
				image: tokenImage
			},
		},
	});
}
