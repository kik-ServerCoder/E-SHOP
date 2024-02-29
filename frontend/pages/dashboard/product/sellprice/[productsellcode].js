import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const EditsellProduct = () => {
  const router = useRouter();
  const { productsellcode } = router.query;

  const [productsellData, setProductsellData] = useState({
    prod_name: '',
    prod_code: '',
    prod_sku: '',
    prod_sellprice: '',
    prod_totalSP: '',
  });

  const [unitsToReduce, setUnitsToReduce] = useState('');
  const [reducedQuantity, setReducedQuantity] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsellData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          router.push("/");
          return;
        }

        const response = await axios.get(`http://localhost:3000/product/getproductwithcode/${productsellcode}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 200) {
          setProductsellData(response.data);
        } else {
          setError('Error fetching product data');
        }
      } catch (error) {
        setError(`Error fetching product data: ${error.message}`);
      }
    };

    if (productsellcode) {
      fetchProductsellData();
    }
  }, [productsellcode, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductsellData((prevData) => {
      const newData = { ...prevData, [name]: value };

      if (name === 'prod_sellprice' || name === 'prod_sku') {
        calculateTotalPrice(newData);
      }

      return newData;
    });
  };

  const calculateTotalPrice = (data) => {
    const price = parseFloat(data.prod_sellprice) || 0;
    const originalQuantity = parseInt(productsellData.prod_sku) || 0;
    const unitsToReduceValue = parseInt(unitsToReduce) || 0;

    const updatedQuantity = originalQuantity - unitsToReduceValue;
    const prod_totalSP = (price * unitsToReduceValue).toFixed();

    setProductsellData((prevData) => ({ ...prevData, prod_totalSP }));
    setReducedQuantity(updatedQuantity);
  };


const handlesellProduct = async () => {
  try {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      router.push("/");
      return;
    }

    const updatedQuantity = String(parseInt(productsellData.prod_sku) - parseInt(unitsToReduce || 0));

    const response = await axios.patch(`http://localhost:3000/product/editsellprice/${productsellcode}`, {
      ...productsellData,
      prod_sku: updatedQuantity,
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 201) {
      console.log("Ok.")
    } else {
      setError(`Error updating product: ${response.statusText}`);
    }
    const sellPriceHistoryData = {
      prod_code: productsellData.prod_code,
      prod_name: productsellData.prod_name,
      prod_sellsku: String(unitsToReduce),
      prod_sellprice: productsellData.prod_sellprice,
      prod_totalSP: productsellData.prod_totalSP,
      
    };

   
    const responseHistory = await axios.post('http://localhost:3000/product/prodsellpricetracking', sellPriceHistoryData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (responseHistory.status === 201) {
      router.push("/dashboard/product/sellprice/addsellprice");
 
    } else {
      console.error(`Error updating SellPriceHistory table: ${responseHistory.statusText}`);
   
    }
  } catch (error) {
    setError(`Error updating product: ${error.message}`);
  }
};



  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Edit Sell Price</h2>
        <form onSubmit={(e) => { e.preventDefault(); handlesellProduct(); }}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Code:</label>
            <input
              type="text"
              name="prod_code"
              value={productsellData.prod_code}
              readOnly
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Name:</label>
            <input
              type="text"
              name="prod_name"
              value={productsellData.prod_name}
              readOnly
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Current Quantity: {productsellData.prod_sku}</label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Product Sell Price:</label>
            <input
              type="text"
              name="prod_sellprice"
              value={productsellData.prod_sellprice || ''}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Sold Units:</label>
            <input
              type="text"
              name="unitsToReduce"
              value={unitsToReduce}
              onChange={(e) => setUnitsToReduce(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Current Quantity: {reducedQuantity}</label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Total Sell Price:</label>
            <input
              type="text"
              name="prod_totalsP"
              value={productsellData.prod_totalSP}
              readOnly
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Update Sell Price
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditsellProduct;
