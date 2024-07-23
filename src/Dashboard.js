import React, { useState, useEffect } from 'react';
import './admin.css';

const Dashboard = () => {
    const [activeCard, setActiveCard] = useState('stock-remained');
    const [showBookingsDropdown, setShowBookingsDropdown] = useState(false);
    const [data, setData] = useState({
        stock: 0,
        bookings: 0,
        pendingDeliveries: 0,
        earnings: 0
    });

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const response = await fetch('data.txt');
            const textData = await response.text();
            const jsonData = JSON.parse(textData);
            setData(jsonData);
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
                    </div>
                    <div className={`card ${activeCard === 'update-stock' ? 'active' : ''}`} id="update-stock">
                        <h2>Update Stock</h2>
                        <p>
                            <label htmlFor="new-stock">Add new stock:</label>
                            <input type="number" id="new-stock" name="new-stock" placeholder="Enter quantity" />
                            <button onClick={() => updateStock(parseInt(document.getElementById('new-stock').value))}>Update</button>
                        </p>
                    </div>
                    <div className={`card ${activeCard === 'remove-stock' ? 'active' : ''}`} id="remove-stock">
                        <h2>Remove Stock</h2>
                        <p>
                            <label htmlFor="remove-stock">Remove stock:</label>
                            <input type="number" id="remove-stock" name="remove-stock" placeholder="Enter quantity" />
                            <button onClick={() => removeStock(parseInt(document.getElementById('remove-stock').value))}>Remove</button>
                        </p>
                    </div>
                    <div className={`card ${activeCard === 'bookings-control' ? 'active' : ''}`} id="bookings-control">
                        <h2>Bookings Control</h2>
                        <p>Total bookings this month: {data.bookings}</p>
                    </div>
                    <div className={`card ${activeCard === 'view-bookings' ? 'active' : ''}`} id="view-bookings">
                        <h2>View Bookings</h2>
                        <p>Total bookings this month: {data.bookings}</p>
                        <p>Here you can view all bookings.</p>
                    </div>
                    <div className={`card ${activeCard === 'manage-bookings' ? 'active' : ''}`} id="manage-bookings">
                        <h2>Manage Bookings</h2>
                        <p>Total bookings this month: {data.bookings}</p>
                        <p>Here you can manage all bookings.</p>
                    </div>
                    <div className={`card ${activeCard === 'delivery-updates' ? 'active' : ''}`} id="delivery-updates">
                        <h2>Delivery Updates</h2>
                        <p>Pending deliveries: {data.pendingDeliveries}</p>
                        <p>
                            <button>Track Deliveries</button>
                            <button>Update Status</button>
                        </p>
                    </div>
                    <div className={`card ${activeCard === 'monthly-earnings' ? 'active' : ''}`} id="monthly-earnings">
                        <h2>Monthly Earnings</h2>
                        <p>Total earnings this month: ${data.earnings}</p>
                        <p>
                            <button>View Report</button>
                        </p>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <p>&copy; 2024 Shoe Shine</p>
            </footer>
        </div>
    );
};

export default Dashboard;
