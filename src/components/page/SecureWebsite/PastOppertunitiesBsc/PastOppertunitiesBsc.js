import React, { useEffect, useState } from 'react';
import PageTitle from '../Components/PageTitle';
import axios from 'axios';
import moment from 'moment-timezone';
import BottomMessage from '../Components/BottomMessage';
import Disclimer from '../Components/Disclimer';

const PastOpportunitiesBsc = () => {
    const [pastData, setPastData] = useState();
    const [error, setError] = useState(null);
    const [userTimezone, setUserTimezone] = useState('');
    const [isLoading, setIsLoanding] = useState(false);

    const fetchData = async () => {
        setIsLoanding(true);
        try {
            const response = await axios.get("https://backend.dsl.sg/api/v1/arbitrage/mempool/all/trade/random/data");
            const reversedData = response.data;
            setPastData(reversedData);
            setError(null);
            setIsLoanding(false)
        } catch (err) {
            console.error("Error fetching data:", err.message);
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const convertToLocalTime = (gmtTimeString) => {
        const [day, month, year, hour, minute, second] = gmtTimeString.split(/[-\s:]+/); // Split the input string
        const isoString = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`; // Create ISO 8601 format string
        return moment(isoString).tz(userTimezone).format('DD-MM-YYYY HH:mm:ss'); // Convert and format time
    };

    const formatTransactionAddress = (address) => {
        // Get the first 5 and last 5 characters of the address
        return `${address.slice(0, 5)}...${address.slice(-5)}`;
    };

    useEffect(() => {
        fetch('https://ipwhois.app/json/')
            .then((response) => response.json())
            .then((data) => {
                setUserTimezone(data.timezone); // Set the user's timezone
            })
            .catch((error) => {
                console.error('Error fetching timezone:', error);
            });
    }, []);

    return (
        <section className='secure-body-background'>
            <PageTitle title={'Past Opportunities BSC'} />
            <main className='container py-5'>
                <div className='table-responsive'>
                    <table className='table table-striped table-bordered'>
                        <thead className=''>
                            <tr style={{ background: '#D3D3D3', color: 'black' }}>
                                <th>Transaction ID</th>
                                <th>Amount of USDT</th>
                                <th>Amount of Token</th>
                                <th>Token Name</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className='table-body-text-color' style={{color: 'white !important'}}>
                            {pastData?.map((item, index) => (
                                <tr style={{ color: 'white' }} key={index}>
                                    <td style={{ color: 'white' }}>{formatTransactionAddress(item.transactionAddress)}</td>
                                    <td style={{ color: 'white' }}>{item.buyAmountUSD} USDT</td>
                                    <td style={{ color: 'white' }}>{item.buyAmount}</td>
                                    <td style={{ color: 'white' }}>{item.buyTokenName}</td>
                                    {/* <td style={{ color: 'white' }}>{convertToLocalTime(item.timestamp)}</td> */}
                                    {/* <td style={{ color: 'white' }}>{item.timestamp?.slice(0,10)} {item.timestamp?.slice(11,19)}</td> */}
                                    <td style={{ color: 'white' }}>{item.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                        <thead className=''>
                            <tr style={{ background: '#D3D3D3', color: 'black', height: '40px' }}>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                </div>

                {isLoading && <p style={{ color: '#F0A500' }} className='text-center'>Retrieving what you missed in the past 24 hours.</p>}

                <Disclimer />
            </main>
        </section>
    );
};

export default PastOpportunitiesBsc;
