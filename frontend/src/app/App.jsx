import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Builder from '../pages/Builder';
import Preview from '../pages/Preview';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/build" element={<Builder />} />
                <Route path="/preview" element={<Preview />} />
            </Routes>
        </Router>
    );
}

export default App;
