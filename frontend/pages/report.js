import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Report = () => {
  const router = useRouter();
  const [product, setProduct] = useState([]);
  const [buyPriceTracking, setBuyPriceTracking] = useState([]);
  const [sellPriceTracking, setSellPriceTracking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          router.push('/');
          return;
        } 
        
        const currentTime = new Date();
        let startTime;

        switch (selectedTimeRange) {
          case '1hour':
            startTime = new Date(currentTime - 60 * 60 * 1000); 
           
            break;
          case '12hours':
            startTime = new Date(currentTime - 12 * 60 * 60 * 1000); 
            break;
          case '1day':
            startTime = new Date(currentTime - 24 * 60 * 60 * 1000);
            break;
          case '3days':
            startTime = new Date(currentTime - 3 * 24 * 60 * 60 * 1000);
            break;
          case '7days':
            startTime = new Date(currentTime - 7 * 24 * 60 * 60 * 1000);
            break;
          case '1month':
            startTime = new Date(currentTime.setMonth(currentTime.getMonth() - 1)); 
            break;
          case '4months':
            startTime = new Date(currentTime.setMonth(currentTime.getMonth() - 4)); 
            break;
          case '6months':
            startTime = new Date(currentTime.setMonth(currentTime.getMonth() - 6)); 
            break;
          case '8months':
            startTime = new Date(currentTime.setMonth(currentTime.getMonth() - 8)); 
            break;
          case '1year':
            startTime = new Date(currentTime.setFullYear(currentTime.getFullYear() - 1)); 
            break;
          case '3years':
            startTime = new Date(currentTime.setFullYear(currentTime.getFullYear() - 3)); 
            break;
          default:
            startTime = new Date(0); 
            break;
        }
        const startTimeISOString = startTime.toISOString();
       
        const productResponse = await axios.get(`http://localhost:3000/product/getallproductlists?startTime=${startTimeISOString}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
       

        setProduct(Array.isArray(productResponse.data) ? productResponse.data : [productResponse.data]);

        const buyPriceTrackingResponse = await axios.get(`http://localhost:3000/product/getbuytracking?startTime=${startTimeISOString}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setBuyPriceTracking(Array.isArray(buyPriceTrackingResponse.data) ? buyPriceTrackingResponse.data : [buyPriceTrackingResponse.data]);

        const sellPriceTrackingResponse = await axios.get(`http://localhost:3000/product/getselltracking?startTime=${startTimeISOString}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setSellPriceTracking(Array.isArray(sellPriceTrackingResponse.data) ? sellPriceTrackingResponse.data : [sellPriceTrackingResponse.data]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTimeRange]); 

  return (
    <div className="mt-8 overflow-x-auto max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Product Report</h1>

      <label htmlFor="timeRange" className="mr-2 font-semibold">
        Select Time Range:
      </label>
      <select
        id="timeRange"
        value={selectedTimeRange}
        onChange={(e) => setSelectedTimeRange(e.target.value)}
        className="mb-4"
        {...console.log(selectedTimeRange)}
      >
        <option value="all">All Time</option>
        <option value="1hour">Last 1 Hour</option>
        <option value="12hours">Last 12 Hours</option>
        <option value="1day">Last 1 Day</option>
        <option value="3days">Last 3 Days</option>
        <option value="7days">Last 7 Days</option>
        <option value="1month">Last 1 month</option>
        <option value="4months">Last 4 months</option>
        <option value="6months">Last 6 months</option>
        <option value="8months">Last 8 months</option>
        <option value="1year">Last 1 year</option>
        <option value="3years">Last 3 years</option>
      </select>

      <table className="w-full bg-white border border-gray-300 rounded-md shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 font-semibold text-left text-sm border-b">Name</th>
            <th className="py-3 px-6 font-semibold text-left text-sm border-b">Code</th>
            <th className="py-3 px-6 font-semibold text-left text-sm border-b">Total Sell Price</th>
            <th className="py-3 px-6 font-semibold text-left text-sm border-b">Total Buy Price</th>
            <th className="py-3 px-6 font-semibold text-left text-sm border-b">Total Buy Unit</th>
            <th className="py-3 px-6 font-semibold text-left text-sm border-b">Total Sell Unit</th>
            <th className="py-3 px-6 font-semibold text-left text-sm border-b">Profit</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item, index) => {
            const buyPriceData = buyPriceTracking.filter((buyItem) => buyItem.prod_code === item.prod_code);
            const sellPriceData = sellPriceTracking.filter((sellItem) => sellItem.prod_code === item.prod_code);
            const cumulativeBuyUnits = buyPriceData.reduce((acc, buyItem) => acc + parseFloat(buyItem.prod_buysku), 0);
            const cumulativeSellUnits = sellPriceData.reduce((acc, sellItem) => acc + parseFloat(sellItem.prod_sellsku), 0);
            
            return (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="py-2 px-6 border-b">{item.prod_name}</td>
                <td className="py-2 px-6 border-b">{item.prod_code}</td>
                <td className="py-2 px-6 border-b">{item.prod_totalSP}</td>
                <td className="py-2 px-6 border-b">{item.prod_totalBP}</td>
                <td className="py-2 px-6 border-b">{cumulativeBuyUnits}</td>
                <td className="py-2 px-6 border-b">{cumulativeSellUnits}</td>
                <td className={`py-2 px-6 border-b ${Math.sign(item.prod_totalSP - item.prod_totalBP) === 1 ? 'text-green-500' : 'text-red-500'}`}>
                  {item.prod_totalSP - item.prod_totalBP}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="font-semibold">
          <tr>
            <td colSpan="2" className="py-3 px-6 border-t">Total:</td>
            <td className="py-3 px-6 border-t"> {product.reduce((acc, item) => acc + parseFloat(item.prod_totalSP), 0).toLocaleString()}</td>
            <td className="py-3 px-6 border-t"> {product.reduce((acc, item) => acc + parseFloat(item.prod_totalBP), 0).toLocaleString()}</td>
            <td className="py-3 px-6 border-t"> {buyPriceTracking.reduce((acc, buyItem) => acc + parseFloat(buyItem.prod_buysku), 0).toLocaleString()}</td>
            <td className="py-3 px-6 border-t"> {sellPriceTracking.reduce((acc, sellItem) => acc + parseFloat(sellItem.prod_sellsku), 0).toLocaleString()}</td>
            <td className={`py-3 px-6 border-t ${Math.sign(product.reduce((acc, item) => acc + parseFloat(item.prod_totalSP) - parseFloat(item.prod_totalBP), 0)) === 1 ? 'text-green-500' : 'text-red-500'}`}>
              {product.reduce((acc, item) => acc + parseFloat(item.prod_totalSP) - parseFloat(item.prod_totalBP), 0).toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
      <Link href="/dashboard/product/buyPrice/buyhistory">
        <div className=" bg-gray-100 text-black font-bold p-8 m-4 w-38 h-24 flex items-center justify-center hover:bg-green-200">
          Buy History
        </div>
      </Link>
      <Link href="/dashboard/product/sellprice/sellhistory">
        <div className=" bg-gray-100 text-black font-bold p-8 m-4 w-38 h-24 flex items-center justify-center hover:bg-red-200">
          Sell History
        </div>
      </Link>
    </div>
  );
};

export default Report;
