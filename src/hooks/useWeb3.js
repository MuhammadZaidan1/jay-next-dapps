'use client'
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { toast } from 'sonner';

const SEPOLIA_CHAIN_ID = '0xaa36a7'; 
export const useWeb3 = () => {
    const [account, setAccount] = useState(null);
    const [chainId, setChainId] = useState(null);
    const switchToSepolia = async () => {
        if (!window.ethereum) return false;
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: SEPOLIA_CHAIN_ID }],
            });
            return true;
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: SEPOLIA_CHAIN_ID,
                            chainName: 'Sepolia Test Network',
                            rpcUrls: ['https://rpc.sepolia.org'],
                            nativeCurrency: { name: 'Sepolia ETH', symbol: 'ETH', decimals: 18 },
                            blockExplorerUrls: ['https://sepolia.etherscan.io'],
                        }],
                    });
                    return true;
                } catch (addError) {
                    toast.error('Failed to add the Sepolia network. Please try manually.');
                    return false;
                }
            }
            toast.error('Network switch request rejected by the user.');
            return false;
        }
    };
    const connectWallet = useCallback(async () => {
        if (typeof window === 'undefined') return;
        if (!window.ethereum) {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                const dappUrl = window.location.host;
                const deepLink = `https://metamask.app.link/dapp/${dappUrl}`;
                toast.loading('Redirecting to MetaMask App... 🦊');
                setTimeout(() => {
                    window.location.href = deepLink;
                }, 1000);
                return;
            } else {
                toast.error("Web3 wallet not detected. Please install MetaMask. 🦊");
                return;
            }
        }        
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            const network = await provider.getNetwork();
            const currentChainIdHex = '0x' + network.chainId.toString(16);
            if (currentChainIdHex !== SEPOLIA_CHAIN_ID) {
                const isSwitched = await switchToSepolia();
                if (!isSwitched) return;
            }
            setAccount(accounts[0]);
            setChainId(network.chainId);
            toast.success('Wallet Linked Successfully! ⚡');
        } catch (err) {
            if (err.code === 4001) {
                toast.error('Connection request rejected by the user.');
            } else {
                toast.error('Connection failed. Please try again.');
            }
        }
    }, []);
    const disconnectWallet = () => {
        setAccount(null);
        toast.info('Session Terminated');
    };
    useEffect(() => {
        if (typeof window !== 'undefined' && window.ethereum) {
            window.ethereum.request({ method: 'eth_accounts' })
                .then(async (accounts) => {
                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                        const provider = new ethers.BrowserProvider(window.ethereum);
                        const network = await provider.getNetwork();
                        setChainId(network.chainId);
                    }
                });
            const handleAccountsChanged = (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    toast.success('Active Account Updated');
                } else {
                    setAccount(null);
                    toast.error('Wallet Disconnected');
                }
            };
            const handleChainChanged = () => {
                toast.loading('Syncing with new network...');
                window.location.reload();
            };
            window.ethereum.on("accountsChanged", handleAccountsChanged);
            window.ethereum.on("chainChanged", handleChainChanged);
            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            };
        }
    }, []);
    return { account, connectWallet, disconnectWallet, chainId };
};