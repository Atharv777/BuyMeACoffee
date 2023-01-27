import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { toast } from "react-toastify";
import ContractABI from "./ContractABI.json";
import { ethers } from "ethers";

function App() {

    const { address, isConnected } = useAccount()
    const [selected, setSelected] = useState("0.1");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const TipsRead = useContractRead({
        address: '0xFD8022dc2b0E832ffFBfc8D494fdeab9E63f8f91',
        abi: ContractABI,
        functionName: 'getTips',
    })

    const { config } = usePrepareContractWrite({
        address: '0xFD8022dc2b0E832ffFBfc8D494fdeab9E63f8f91',
        abi: ContractABI,
        functionName: 'buyCoffee',
        args: [message, name],
        overrides: {
            from: address,
            value: ethers.utils.parseEther(selected),
        },
        onError(error) {
            console.log('Error', error)
        },
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)


    const Donate = () => {
        if (!isConnected) {
            toast.error('Please connect you wallet', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        write?.()
    }



    return (
        <div className="h-screen w-screen max-w-screen overflow-x-hidden flex-col flex justify-center items-center px-5 py-10">
            <ConnectButton />

            <div className="mb:w-1/3 m-auto flex-col flex justify-center items-center">

                <h1 className="text-black font-extrabold text-2xl mb-7">Buy Me A Coffee</h1>

                <div className="w-full flex flex-col items-center justify-center">
                    <div className="mb-3 w-full">
                        <input
                            type="text"
                            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="Name"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>


                    <div className="mb-3 w-full">
                        <input
                            type="text"
                            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="Message"
                            placeholder="Enter Message"
                            value={message}
                            onChange={(e) => { setMessage(e.target.value) }}
                        />
                    </div>
                </div>


                <div className="w-full flex items-center justify-center">
                    <div className="inline-flex" role="group">
                        <button
                            type="button"
                            onClick={() => setSelected("0.1")}
                            className={` rounded-l px-6 py-2 border-2 border-blue-600 font-medium text-xs leading-tight uppercase focus:outline-none focus:ring-0 transition duration-150 ease-in-out ${selected === "0.1" ? "hover:bg-blue-700 bg-blue-600 text-white" : "text-blue-600 hover:bg-black/5"}`}>
                            0.1 MATIC
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelected("0.5")}
                            className={` px-6 py-2 border-t-2 border-b-2 border-blue-600 font-medium text-xs leading-tight uppercase focus:outline-none focus:ring-0 transition duration-150 ease-in-out ${selected === "0.5" ? "hover:bg-blue-700 bg-blue-600 text-white" : "text-blue-600 hover:bg-black/5"}`}>
                            0.5 MATIC
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelected("1")}
                            className={`px-6 py-2 border-t-2 border-l-2 border-b-2 border-blue-600  font-medium text-xs leading-tight uppercase  focus:outline-none focus:ring-0 transition duration-150 ease-in-out ${selected === "1" ? "hover:bg-blue-700 bg-blue-600 text-white" : "text-blue-600 hover:bg-black/5"}`}>
                            1 MATIC
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelected("5")}
                            className={`rounded-r px-6 py-2 border-2 border-blue-600 font-medium text-xs leading-tight uppercase  focus:outline-none focus:ring-0 transition duration-150 ease-in-out ${selected === "5" ? "hover:bg-blue-700 bg-blue-600 text-white" : "text-blue-600 hover:bg-black/5"}`}>
                            5 MATIC
                        </button>
                    </div>
                </div >

                <button disabled={!write} onClick={Donate} type="button" className="mt-5 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Donate</button>

                {isLoading && <div>Check Wallet</div>}
                {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
            </div>

            <h3 className="mt-10 text-black font-medium text-2xl mb-4">Previous tips</h3>

            <div className="max-h-[250px] overflow-y-auto scrollbar-hide">

                {TipsRead.isFetching
                    ? "Loading..."
                    : TipsRead.data.map((tip) => {
                        return (
                            <div className="mb-5">
                                <p><span className="font-bold">Address:</span> {tip[0]}</p>
                                <p><span className="font-bold">Name:</span> {tip[2]}</p>
                                <p><span className="font-bold">Message:</span> {tip[3]}</p>
                                <p><span className="font-bold">Tip:</span> {ethers.utils.formatEther(tip[4])} MATIC</p>
                                <p><span className="font-bold">At:</span> {new Date(tip[1].toNumber() * 1000).toLocaleString()}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default App;
