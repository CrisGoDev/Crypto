import React from "react";
import { Route,Link,Routes} from 'react-router-dom'
import {Layout,Typography, Space} from 'antd';
import {Navbar,News,Homepage,Exchanges,Cryptocurrencies,CryptoDetails} from "./Components";
import './App.css'

const App = () => {
    return (
    <div className="app">
        <div className="navbar">
            <Navbar/>
            
        </div>
        <div className="main">
            <Layout>
                <div className="routes">
                    <Routes>
                        <Route exact path="/" element={<Homepage/>}>
                            
                        </Route>
                        <Route path="/exchanges" element={<Exchanges/>}>
                           
                        </Route>
                        <Route  path="/cryptocurrencies" element={<Cryptocurrencies/>}>
                            
                        </Route>
                        <Route  path="/crypto/:coinId" element={<CryptoDetails/>}>
                            
                        </Route>
                        <Route  path="/news" element={<News/>}>
                            
                        </Route>
                    </Routes>
                </div>
            </Layout>
            <div className="footer" >
            <Typography.Title level={5} style={{color:'white', textAlign:'center'}}>
                Cryptoverse<br/>
                All Right Reserved
            </Typography.Title>
            <Space>
                <Link to="/">Home</Link>
                <Link to="/exchanges">Exchanges</Link>
                <Link to="/news">News</Link>
                
            </Space>
        </div>
        </div>
        
    </div>);
};

export default App;
