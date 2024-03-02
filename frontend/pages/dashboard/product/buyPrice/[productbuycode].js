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

      if (name === 'prod_buyprice' || name === 'prod_sku') {
        calculateTotalPrice(newData);
      }

      return newData;
    });
  };

  const calculateTotalPrice = (data) => {
    const price = parseFloat(data.prod_buyprice) || 0;
    const originalQuantity = parseInt(productbuyData.prod_sku) || 0;
    const unitsToAddValue = parseInt(unitsToAdd) || 0;
  
    const updatedQuantity = originalQuantity + unitsToAddValue;
    const prod_totalBP = (price * unitsToAddValue).toFixed();
  
    setProductbuyData((prevData) => ({ ...prevData, prod_totalBP }));
    setAddedQuantity(updatedQuantity);
  };
    

const handlebuyProduct = async () => {
  try {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      router.push("/");
      return;
    }

    const updatedQuantity = String(parseInt(productbuyData.prod_sku) + parseInt(unitsToAdd || 0));

    const response = await axios.patch(`http://localhost:3000/product/editbuyprice/${productbuycode}`, {
      ...productbuyData,
      prod_sku: updatedQuantity,
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (parseInt(response.prod_buysku) <= 0) {
      throw new Error('Product SKU must be a positive value.');
    }
    if (response.status === 200) {
      console.log("Ok.")
    } else {
      setError(`Error updating product: ${response.statusText}`);
    }
    const buyPriceHistoryData = {
      prod_code: productbuyData.prod_code,
      prod_name: productbuyData.prod_name,
      prod_buysku: String(unitsToAdd),
      prod_buyprice: productbuyData.prod_buyprice,
      prod_totalBP: productbuyData.prod_totalBP,
      
    };

   
    const responseHistory = await axios.post('http://localhost:3000/product/prodbuypricetracking', buyPriceHistoryData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (responseHistory.status === 201) {
      router.push("/dashboard/product/buyPrice/addbuyprice");
 
    } else {
      console.error(`Error updating buyPriceHistory table: ${responseHistory.statusText}`);
   
    }
  } catch (error) {
    setError(`Error updating product: ${error.message}`);
  }
};



  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Edit Buy Price</h2>
        <form onSubmit={(e) => { e.preventDefault(); handlebuyProduct(); }}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Code:</label>
            <input
              type="text"
              name="prod_code"
              value={productbuyData.prod_code}
              readOnly
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Name:</label>
            <input
              type="text"
              name="prod_name"
              value={productbuyData.prod_name}
              readOnly
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Current Quantity: {productbuyData.prod_sku}</label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Buy Units</label>
            <input
              type="text"
              name="unitsToAdd"
              value={unitsToAdd}
              onChange={(e) => setUnitsToAdd(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Updated Quantity: {parseInt(productbuyData.prod_sku)+parseInt(unitsToAdd)}</label>
          </div>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Product Buy Price:</label>
            <input
              type="text"
              name="prod_buyprice"
              value={productbuyData.prod_buyprice || ''}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Total Buy Price:</label>
            <input
              type="text"
              name="prod_totalBP"
              value={productbuyData.prod_totalBP}
              readOnly
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

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
