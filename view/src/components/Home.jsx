import React, { useState, useEffect } from 'react';
import './style.css'; // Import custom CSS file

function Home() {
    const [visitorCount, setVisitorCount] = useState(0);
    const [employeeCount, setEmployeeCount] = useState(0);
    const [assetCount, setAssetCount] = useState(0);

    useEffect(() => {
        fetchCounts();
    }, []);

    const fetchCounts = () => {
        // Fetch visitor count
        fetch('http://localhost:3000/visitor')
            .then(response => response.json())
            .then(data => {
                setVisitorCount(data.count);
            })
            .catch(error => {
                console.error('Error fetching visitor count:', error);
            });

        // Fetch employee count
        fetch('http://localhost:3000/employee')
            .then(response => response.json())
            .then(data => {
                setEmployeeCount(data.count);
            })
            .catch(error => {
                console.error('Error fetching employee count:', error);
            });

        // Fetch asset count
        fetch('http://localhost:3000/assests')
            .then(response => response.json())
            .then(data => {
                setAssetCount(data.count);
            })
            .catch(error => {
                console.error('Error fetching asset count:', error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Visitor Count</h5>
                            <p className="card-text">{visitorCount}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Employee Count</h5>
                            <p className="card-text">{employeeCount}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Asset Count</h5>
                            <p className="card-text">{assetCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
