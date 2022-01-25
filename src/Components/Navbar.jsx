import React from 'react';
import { useState ,useEffect} from 'react';
import { Button,Menu, Typography, Avatar } from 'antd';
import {Link} from 'react-router-dom';
import { HomeOutlined,MoneyCollectOutlined,BulbOutlined, MenuOutlined } from '@ant-design/icons/lib/icons';
import icon from './images/cryptocurrency.png'
const Navbar = () => {
    const [activedmenu, setActivemenu]=useState(true);
    const [screenSize,setscreenSize]=useState(null);

    useEffect(()=>{
        const handleresize=()=>setscreenSize(window.innerWidth);
        window.addEventListener('risize', handleresize);

        handleresize();
        return()=> window.removeEventListener('resize',handleresize)
    },[])

    useEffect(()=>{
        if(screenSize<768){
            setActivemenu(false)
        }else{
            setActivemenu(true)
        }
    },[screenSize])
  return (
      <div className='nav-container'>
          <div className='logo-container'>
              <Avatar src={icon} size="large"/>
              <Typography.Title level={2} className='logo'>
                  <Link to="/">Cryptoverse</Link>
                </Typography.Title>
                <Button className='menu-control-container' onClick={()=>setActivemenu(!activedmenu)}>
                   <MenuOutlined/> 
                </Button>
            </div>
                {activedmenu&&(
                    <Menu theme='dark'>
                    <Menu.Item icon={<HomeOutlined/>}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    
                    <Menu.Item icon={<MenuOutlined/>}>
                        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined/>}>
                        <Link to="/exchanges">Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined/>}>
                        <Link to="/news">News</Link>
                    </Menu.Item>
                </Menu>
                )}
          
      </div>
  )
};

export default Navbar;
