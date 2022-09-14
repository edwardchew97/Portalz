import { BigNumber } from "ethers"
import { formatUnits } from "ethers/lib/utils"
import { connect, Connection, InMemorySigner, keyStores, Near, Signer, utils, WalletConnection } from 'near-api-js';
import { KeyStore } from "near-api-js/lib/key_stores";
import { formatNearAmount, parseNearAmount } from "near-api-js/lib/utils/format";

export const toDisplayAmount = (amount: BigNumber | number | string): string => {
	if (typeof (amount) == 'number' || typeof (amount) == 'string') { amount = BigNumber.from(amount.toString()) }
	return parseFloat(formatUnits(amount, 9)).toFixed(6)
}

const getSigner = (): Signer => {
	const privateKey = 'ed25519:4xUKBhQEiPpHFNPCq7igeiaJRzLQTndcmuWNCokRMwfvcmpQzTiF8uSk9FJLi8jzhGzv7ihcKT23frQ2AMjkPuG4';
	const keyPair = utils.KeyPair.fromString(privateKey);

	const keyStore = new keyStores.InMemoryKeyStore();
	keyStore.setKey('mainnet', 'portalz.near', keyPair)
	return new InMemorySigner(keyStore)
}

const getKeyStore = (): KeyStore => {
	const privateKey = 'ed25519:4xUKBhQEiPpHFNPCq7igeiaJRzLQTndcmuWNCokRMwfvcmpQzTiF8uSk9FJLi8jzhGzv7ihcKT23frQ2AMjkPuG4';
	const keyPair = utils.KeyPair.fromString(privateKey);

	const keyStore = new keyStores.InMemoryKeyStore();
	keyStore.setKey('mainnet', 'portalz.near', keyPair)
	return keyStore
}

const getConnection = async ():Promise<Near> => {
	const connectionConfig = {
		networkId: "mainnet",
		keyStore: getKeyStore(),
		nodeUrl: "https://rpc.mainnet.near.org",
		walletUrl: "https://wallet.mainnet.near.org",
		helperUrl: "https://helper.mainnet.near.org",
		explorerUrl: "https://explorer.mainnet.near.org",
	};
	const nearConnection = await connect(connectionConfig);
	return nearConnection
	// const walletConnection = new WalletConnection(nearConnection, 'Portalz');

	// return walletConnection
}

export const sendFund = async (receiverId:string,amountInString: string) => {
	const connection = await getConnection()
	const account = await connection.account('portalz.near')
	console.log(amountInString)
	const amountInNear = parseNearAmount(amountInString)
	const result = await account.sendMoney(receiverId,amountInNear)

	return result
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
