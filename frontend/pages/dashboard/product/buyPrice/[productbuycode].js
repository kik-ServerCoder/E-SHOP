import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const EditsellProduct = () => {
  const router = useRouter();
  const { productbuycode } = router.query;

  const [productbuyData, setProductbuyData] = useState({
    prod_name: '',
    prod_code: '',
    prod_sku: '',
    prod_buyprice: '',
    prod_totalBP: '',
  });

  const [unitsToAdd, setUnitsToAdd] = useState('');
  const [AddedQuantity, setAddedQuantity] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProductbuyData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          router.push("/");
          return;
        }

        const response = await axios.get(`http://localhost:3000/product/getproductwithcode/${productbuycode}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 200) {
          setProductbuyData(response.data);
        } else {
          setError('Error fetching product data');
        }
      } catch (error) {
        setError(`Error fetching product data: ${error.message}`);
      }
    };

    if (productbuycode) {
      fetchProductbuyData();
    }
  }, [productbuycode, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductbuyData((prevData) => {
      const newData = { ...prevData, [name]: value };

      if (name === 'prod_buyprice' || name === 'prod_sku'||name === 'prod_totalBP') {
        calculateTotalPrice(newData);
      }

      return newData;
    });
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handlebuyProduct();
    }
  };
  const calculateTotalPrice = (data,unitsToAdd) => {
    const price = parseFloat(data.prod_buyprice) || 0;
    const originalQuantity = parseInt(data.prod_sku) || 0;
    const unitsToAddValue = parseInt(unitsToAdd) || 0;
  
    const updatedQuantity = originalQuantity + unitsToAddValue;
    const prod_pretotalBuyPrice = (price * unitsToAddValue)||0;
    setAddedQuantity(updatedQuantity);
    setProductbuyData((prevData) => ({ ...prevData,  }));
    
  };
    

const handlebuyProduct = async () => {
  try {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      router.push("/");
      return;
    }

    const updatedQuantity = String(parseInt(productbuyData.prod_sku) + parseInt(unitsToAdd || 0));
    const prod_totalBuyPrice = (parseFloat(productbuyData.prod_totalBP) || 0) + parseFloat(prod_pretotalBuyPrice);
    const response = await axios.patch(`http://localhost:3000/product/editbuyprice/${productbuycode}`, {
        ...productbuyData,
        prod_sku: updatedQuantity,  prod_totalBP: String(prod_totalBuyPrice),
      },  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (parseInt(response.prod_buysku) <= 0) {
      throw new Error('Product SKU must be a positive value.');
    }
    if (response.status === 200) {
      setSuccessMessage('Buy price updated successfully.');
    } else {
      setError(`Error updating product: ${response.statusText}`);
    }
    const buyPriceHistoryData = {
      prod_code: productbuyData.prod_code,
      prod_name: productbuyData.prod_name,
      prod_buysku: String(unitsToAdd),
      prod_buyprice: productbuyData.prod_buyprice,
      prod_totalBP: prod_pretotalBuyPrice,
      
    };

   
    const responseHistory = await axios.post('http://localhost:3000/product/prodbuypricetracking', buyPriceHistoryData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (responseHistory.status !== 201) {
      console.error(`Error updating BuyPriceHistory table: ${responseHistory.statusText}`);
    } else {
      console.error(`Error updating buyPriceHistory table: ${responseHistory.statusText}`);
   
    }
  } catch (error) {
    setError(`Error updating product: ${error.message}`);
  }
};
useEffect(() => {
  if (successMessage) {
    const redirectTimer = setTimeout(() => {
      router.push("/dashboard/product/sellprice/addsellprice");
    }, 1000); 

    return () => clearTimeout(redirectTimer);
  }
}, [successMessage, router]);

const prod_pretotalBuyPrice = (productbuyData.prod_buyprice *parseInt(unitsToAdd) ).toFixed()||0;
const updatedQuantity = String(parseInt(productbuyData.prod_sku) + parseInt(unitsToAdd || 0));

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Edit Buy Price</h2>
        <form onSubmit={(e) => { e.preventDefault(); handlebuyProduct(); }}>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Code: {productbuyData.prod_code}</label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Name: {productbuyData.prod_name}</label>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Current SKU: {productbuyData.prod_sku}</label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Add Buy Units</label>
            <input
              type="text"
              name="unitsToAdd"
              value={unitsToAdd}
              onChange={(e) => setUnitsToAdd(e.target.value)}
              onKeyDown={handleKeyDown}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Updated SKU: {updatedQuantity}</label>
          </div>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Add Buy Price:</label>
            <input
              type="text"
              name="prod_buyprice"
              value={productbuyData.prod_buyprice || ''}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Total Buy Price:</label>
            <input
              type="text"
              name="prod_totalBP"
              value={prod_pretotalBuyPrice}
              readOnly
              
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Update Buy Price
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditsellProduct;
