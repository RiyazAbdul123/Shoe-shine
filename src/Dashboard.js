
// import React, { useState, useEffect } from 'react';
// import './admin.css';

// const Dashboard = () => {
//     const [activeCard, setActiveCard] = useState('stock-remained');
//     const [showBookingsDropdown, setShowBookingsDropdown] = useState(false);
//     const [data, setData] = useState({
//         stock: 0,
//         bookings: 0,
//         pendingDeliveries: 0,
//         earnings: 0,
//         products: []
//     });

//     useEffect(() => {
//         fetchInitialData();
//     }, []);

//     const fetchInitialData = async () => {
//         try {
//             const response = await fetch('https://mrv1.indianwelfarefoundation.org.in/products');
//             const jsonData = await response.json();
//             setData(prevData => ({
//                 ...prevData,
//                 stock: jsonData.reduce((acc, product) => acc + product.productQuantity, 0),
//                 products: jsonData
//             }));
//         } catch (err) {
//             console.error('Error reading data file', err);
//         }
//     };

//     const showCard = (cardId) => {
//         setActiveCard(cardId);
//         if (cardId === 'bookings-control') {
//             setShowBookingsDropdown(true);
//         } else {
//             setShowBookingsDropdown(false);
//         }
//     };

//     const updateData = async (newData) => {
//         const updatedData = { ...data, ...newData };
//         setData(updatedData);
//         try {
//             await fetch('/data.txt', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(updatedData, null, 2)
//             });
//         } catch (err) {
//             console.error('Error writing data file', err);
//         }
//     };

//     const updateStock = (quantity) => {
//         const newStock = data.stock + quantity;
//         updateData({ stock: newStock });
//     };

//     const removeStock = (quantity) => {
//         const newStock = data.stock - quantity;
//         updateData({ stock: newStock });
//     };

//     const [formValues, setFormValues] = useState({
//         productId: '',
//         productName: '',
//         productCategory: '',
//         productPrice: '',
//         productQuantity: '',
//         productDescription: '',
//         productSizes: '',
//         productImageUrl1: '',
//         productImageUrl2: '',
//         productImageUrl3: '',
//         productImageUrl4: '',
//         productImageUrl5: '',
//         productImageUrl6: '',
//     });

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormValues(prevValues => ({
//             ...prevValues,
//             [name]: value
//         }));
//     };

//     const handleUpdateStock = async (event) => {
//         event.preventDefault();
//         const updatedProduct = {
//             ...formValues,
//             productQuantity: parseInt(formValues.productQuantity, 10),
//         };
//         try {
//             const response = await fetch('https://mrv1.indianwelfarefoundation.org.in/products', {
//                 method: 'PATCH', // Use 'PUT' or 'PATCH' depending on API requirements
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // Include any required authorization headers here
//                 },
//                 body: JSON.stringify(updatedProduct)
//             });
    
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
    
//             const responseData = await response.json();
//             console.log('Update response:', responseData); // Log the response for debugging
//             alert('Product updated successfully!');
//         } catch (err) {
//             console.error('Error updating product:', err);
//         }
//     };;

//     return (
//         <div>
//             <nav className="navbar">
//                 <div className="navbar-left">
//                     <h1>Shoe Shine Dashboard</h1>
//                 </div>
//                 <div className="navbar-right">
//                     <ul>
//                         <li><a href="#">Admin</a></li>
//                         <li><a href="#">Download</a></li>
//                     </ul>
//                 </div>
//             </nav>

//             <div className="main">
//                 <aside className="sidebar">
//                     <ul>
//                         <li><a href="#" onClick={() => showCard('stock-remained')}>Stock Remained</a></li>
//                         <li><a href="#" onClick={() => showCard('update-stock')}>Update Stock</a></li>
//                         <li><a href="#" onClick={() => showCard('remove-stock')}>Remove Stock</a></li>
//                         <li>
//                             <a href="#" onClick={() => showCard('bookings-control')}>Bookings Control</a>
//                             {showBookingsDropdown && (
//                                 <ul className="sub-menu">
//                                     <li><a href="#" onClick={() => showCard('view-bookings')}>View Bookings</a></li>
//                                     <li><a href="#" onClick={() => showCard('manage-bookings')}>Manage Bookings</a></li>
//                                 </ul>
//                             )}
//                         </li>
//                         <li><a href="#" onClick={() => showCard('delivery-updates')}>Delivery Updates</a></li>
//                         <li><a href="#" onClick={() => showCard('monthly-earnings')}>Monthly Earnings</a></li>
//                     </ul>
//                 </aside>

//                 <div className="container">
//                     <div className={`card ${activeCard === 'stock-remained' ? 'active' : ''}`} id="stock-remained">
//                         <h2>Stock Remained</h2>
//                         <p>Currently in stock: {data.stock} pairs</p>
//                         {data.products.map(product => (
//                             <div key={product.id}>
//                                 <h3>{product.productName}</h3>
//                                 <p>{product.productDescription}</p>
//                                 {product.productImages.map((image, index) => (
//                                     image && <img key={index} src={image} alt={product.productName} />
//                                 ))}
//                             </div>
//                         ))}
//                     </div>
//                     <div className={`card ${activeCard === 'update-stock' ? 'active' : ''}`} id="update-stock">
//                         <h2>Update Stock</h2>
//                         <form onSubmit={handleUpdateStock}>
//                             <label>
//                                 Product ID:
//                                 <input type="text" name="productId" value={formValues.productId} onChange={handleInputChange} required />
//                             </label>
//                             <label>
//                                 Product Name:
//                                 <input type="text" name="productName" value={formValues.productName} onChange={handleInputChange} required />
//                             </label>
//                             <label>
//                                 Product Category:
//                                 <input type="text" name="productCategory" value={formValues.productCategory} onChange={handleInputChange} required />
//                             </label>
//                             <label>
//                                 Product Price:
//                                 <input type="number" name="productPrice" value={formValues.productPrice} onChange={handleInputChange} required />
//                             </label>
//                             <label>
//                                 Product Quantity:
//                                 <input type="number" name="productQuantity" value={formValues.productQuantity} onChange={handleInputChange} required />
//                             </label>
//                             <label>
//                                 Product Description:
//                                 <textarea name="productDescription" value={formValues.productDescription} onChange={handleInputChange} required />
//                             </label>
//                             <label>
//                                 Product Sizes (comma-separated):
//                                 <input type="text" name="productSizes" value={formValues.productSizes} onChange={handleInputChange} />
//                             </label>
//                             <label>
//                                 Side View Image URL:
//                                 <input type="url" name="productImageUrl1" value={formValues.productImageUrl1} onChange={handleInputChange} />
//                             </label>
//                             <label>
//                                 Front View Image URL:
//                                 <input type="url" name="productImageUrl2" value={formValues.productImageUrl2} onChange={handleInputChange} />
//                             </label>
//                             <label>
//                                 Top View Image URL:
//                                 <input type="url" name="productImageUrl3" value={formValues.productImageUrl3} onChange={handleInputChange} />
//                             </label>
//                             <label>
//                                 Back View Image URL:
//                                 <input type="url" name="productImageUrl4" value={formValues.productImageUrl4} onChange={handleInputChange} />
//                             </label>
//                             <label>
//                                 Detailed View Image URL:
//                                 <input type="url" name="productImageUrl5" value={formValues.productImageUrl5} onChange={handleInputChange} />
//                             </label>
//                             <label>
//                                 Angle View Image URL:
//                                 <input type="url" name="productImageUrl6" value={formValues.productImageUrl6} onChange={handleInputChange} />
//                             </label>
//                             <button type="submit">Update Product</button>
//                         </form>
//                     </div>
//                     <div className={`card ${activeCard === 'remove-stock' ? 'active' : ''}`} id="remove-stock">
//                         <h2>Remove Stock</h2>
//                         <input id="remove-quantity" type="number" placeholder="Quantity to remove" />
//                         <button onClick={() => removeStock(parseInt(document.getElementById('remove-quantity').value, 10))}>Remove Stock</button>
//                     </div>
//                     <div className={`card ${activeCard === 'bookings-control' ? 'active' : ''}`} id="bookings-control">
//                         <h2>Bookings Control</h2>
//                         {/* Booking control content */}
//                     </div>
//                     <div className={`card ${activeCard === 'view-bookings' ? 'active' : ''}`} id="view-bookings">
//                         <h2>View Bookings</h2>
//                         {/* View bookings content */}
//                     </div>
//                     <div className={`card ${activeCard === 'manage-bookings' ? 'active' : ''}`} id="manage-bookings">
//                         <h2>Manage Bookings</h2>
//                         {/* Manage bookings content */}
//                     </div>
//                     <div className={`card ${activeCard === 'delivery-updates' ? 'active' : ''}`} id="delivery-updates">
//                         <h2>Delivery Updates</h2>
//                         {/* Delivery updates content */}
//                     </div>
//                     <div className={`card ${activeCard === 'monthly-earnings' ? 'active' : ''}`} id="monthly-earnings">
//                         <h2>Monthly Earnings</h2>
//                         {/* Monthly earnings content */}
//                     </div>
//                 </div>
//             </div>

//             <footer className="footer">
//                 &copy; 2024 Shoe Shine. All rights reserved.
//             </footer>
//         </div>
//     );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import './admin.css';

const Dashboard = () => {
    const [activeCard, setActiveCard] = useState('stock-remained');
    const [showBookingsDropdown, setShowBookingsDropdown] = useState(false);
    const [data, setData] = useState({
        stock: 0,
        bookings: 0,
        pendingDeliveries: 0,
        earnings: 0,
        products: []
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const response = await fetch('https://mrv1.indianwelfarefoundation.org.in/products');
            const jsonData = await response.json();
            setData(prevData => ({
                ...prevData,
                stock: jsonData.reduce((acc, product) => acc + product.productQuantity, 0),
                products: jsonData
            }));
        } catch (err) {
            console.error('Error reading data file', err);
        }
    };

    const showCard = (cardId) => {
        setActiveCard(cardId);
        if (cardId === 'bookings-control') {
            setShowBookingsDropdown(true);
        } else {
            setShowBookingsDropdown(false);
        }
    };

    const updateData = async (newData) => {
        const updatedData = { ...data, ...newData };
        setData(updatedData);
        try {
            await fetch('/data.txt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData, null, 2)
            });
        } catch (err) {
            console.error('Error writing data file', err);
        }
    };

    const updateStock = (quantity) => {
        const newStock = data.stock + quantity;
        updateData({ stock: newStock });
    };

    const removeStock = (quantity) => {
        const newStock = data.stock - quantity;
        updateData({ stock: newStock });
    };

    const [formValues, setFormValues] = useState({
        productId: '',
        productName: '',
        productCategory: '',
        productPrice: '',
        productQuantity: '',
        productDescription: '',
        productSizes: '',
        productImageUrl1: '',
        productImageUrl2: '',
        productImageUrl3: '',
        productImageUrl4: '',
        productImageUrl5: '',
        productImageUrl6: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleUpdateStock = async (event) => {
        event.preventDefault();
        const updatedProduct = {
            ...formValues,
            productQuantity: parseInt(formValues.productQuantity, 10),
        };
        try {
            const response = await fetch('https://mrv1.indianwelfarefoundation.org.in/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Update response:', responseData);
            alert('Product updated successfully!');
        } catch (err) {
            console.error('Error updating product:', err);
        }
    };

    // Search handler
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    // Filter products based on search query
    const filteredProducts = data.products.filter(product =>
        product.productName.toLowerCase().includes(searchQuery) ||
        product.productDescription.toLowerCase().includes(searchQuery)
    );

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-left">
                    <h1>Shoe Shine Dashboard</h1>
                </div>
                <div className="navbar-right">
                    <ul>
                        <li><a href="#">Admin</a></li>
                        <li><a href="#">Download</a></li>
                    </ul>
                </div>
            </nav>

            <div className="main">
                <aside className="sidebar">
                    <ul>
                        <li><a href="#" onClick={() => showCard('stock-remained')}>Stock Remained</a></li>
                        <li><a href="#" onClick={() => showCard('update-stock')}>Update Stock</a></li>
                        <li><a href="#" onClick={() => showCard('remove-stock')}>Remove Stock</a></li>
                        <li>
                            <a href="#" onClick={() => showCard('bookings-control')}>Bookings Control</a>
                            {showBookingsDropdown && (
                                <ul className="sub-menu">
                                    <li><a href="#" onClick={() => showCard('view-bookings')}>View Bookings</a></li>
                                    <li><a href="#" onClick={() => showCard('manage-bookings')}>Manage Bookings</a></li>
                                </ul>
                            )}
                        </li>
                        <li><a href="#" onClick={() => showCard('delivery-updates')}>Delivery Updates</a></li>
                        <li><a href="#" onClick={() => showCard('monthly-earnings')}>Monthly Earnings</a></li>
                    </ul>
                </aside>

                <div className="container">
                    <div className={`card ${activeCard === 'stock-remained' ? 'active' : ''}`} id="stock-remained">
                        <h2>Stock Remained</h2>
                        <p>Currently in stock: {data.stock} pairs</p>
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            value={searchQuery} 
                            onChange={handleSearchChange}
                        />
                        {filteredProducts.map(product => (
                            <div key={product.id}>
                                <h3>{product.productName}</h3>
                                <p>{product.productDescription}</p>
                                {product.productImages && product.productImages.map((image, index) => (
                                    image && <img key={index} src={image} alt={product.productName} />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className={`card ${activeCard === 'update-stock' ? 'active' : ''}`} id="update-stock">
                        <h2>Update Stock</h2>
                        <form onSubmit={handleUpdateStock}>
                            <label>
                                Product ID:
                                <input type="text" name="productId" value={formValues.productId} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Product Name:
                                <input type="text" name="productName" value={formValues.productName} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Product Category:
                                <input type="text" name="productCategory" value={formValues.productCategory} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Product Price:
                                <input type="number" name="productPrice" value={formValues.productPrice} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Product Quantity:
                                <input type="number" name="productQuantity" value={formValues.productQuantity} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Product Description:
                                <textarea name="productDescription" value={formValues.productDescription} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Product Sizes (comma-separated):
                                <input type="text" name="productSizes" value={formValues.productSizes} onChange={handleInputChange} />
                            </label>
                            <label>
                                Side View Image URL:
                                <input type="url" name="productImageUrl1" value={formValues.productImageUrl1} onChange={handleInputChange} />
                            </label>
                            <label>
                                Front View Image URL:
                                <input type="url" name="productImageUrl2" value={formValues.productImageUrl2} onChange={handleInputChange} />
                            </label>
                            <label>
                                Top View Image URL:
                                <input type="url" name="productImageUrl3" value={formValues.productImageUrl3} onChange={handleInputChange} />
                            </label>
                            <label>
                                Back View Image URL:
                                <input type="url" name="productImageUrl4" value={formValues.productImageUrl4} onChange={handleInputChange} />
                            </label>
                            <label>
                                Detailed View Image URL:
                                <input type="url" name="productImageUrl5" value={formValues.productImageUrl5} onChange={handleInputChange} />
                            </label>
                            <label>
                                Angle View Image URL:
                                <input type="url" name="productImageUrl6" value={formValues.productImageUrl6} onChange={handleInputChange} />
                            </label>
                            <button type="submit">Update Product</button>
                        </form>
                    </div>
                    <div className={`card ${activeCard === 'remove-stock' ? 'active' : ''}`} id="remove-stock">
                        <h2>Remove Stock</h2>
                        <input id="remove-quantity" type="number" placeholder="Quantity to remove" />
                        <button onClick={() => removeStock(parseInt(document.getElementById('remove-quantity').value, 10))}>Remove Stock</button>
                    </div>
                    <div className={`card ${activeCard === 'bookings-control' ? 'active' : ''}`} id="bookings-control">
                        <h2>Bookings Control</h2>
                        {/* Booking control content */}
                    </div>
                    <div className={`card ${activeCard === 'view-bookings' ? 'active' : ''}`} id="view-bookings">
                        <h2>View Bookings</h2>
                        {/* View bookings content */}
                    </div>
                    <div className={`card ${activeCard === 'manage-bookings' ? 'active' : ''}`} id="manage-bookings">
                        <h2>Manage Bookings</h2>
                        {/* Manage bookings content */}
                    </div>
                    <div className={`card ${activeCard === 'delivery-updates' ? 'active' : ''}`} id="delivery-updates">
                        <h2>Delivery Updates</h2>
                        {/* Delivery updates content */}
                    </div>
                    <div className={`card ${activeCard === 'monthly-earnings' ? 'active' : ''}`} id="monthly-earnings">
                        <h2>Monthly Earnings</h2>
                        {/* Monthly earnings content */}
                    </div>
                </div>
            </div>

            <footer className="footer">
                &copy; 2024 Shoe Shine. All rights reserved.
            </footer>
        </div>
    );
};

export default Dashboard;
