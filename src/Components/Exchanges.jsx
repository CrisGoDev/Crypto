import React, { useState } from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import Ver from './Ver';
import { useParams } from 'react-router-dom';
// import { useGetCryptosExchangesQuery } from '../services/cryptoApi';
import { useGetCryptosExchangesQuery } from '../Services/cryptoApi';
import {  CheckCircleTwoTone } from '@ant-design/icons';

const { Text } = Typography;
const { Panel } = Collapse;


const Exchanges = () => {
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptosExchangesQuery(coinId);
  const [rock,setrock]=useState(true)
  let [openPanels, setOpenPanels] = React.useState([]);
  
 // Note: To access this endpoint you need premium plan
  if (isFetching) return 'Loadiing ....';
  const exchangesList = data.data.exchanges;
  
  

  return (
    
    <>
    <Row>
        <Col span={6}>Exchanges</Col>
        {/* <Col span={6}>24h Trade Volume</Col> */}
        <Col span={6}>Markets</Col>
        <Col span={6}>Price</Col>
      </Row>

      <Row>
       
         {exchangesList.map((exchange) => (
           
          <Col span={24} >
            <Collapse 
            activeKey={openPanels}
            onChange={(event)=>{
             setrock(exchange.recommended)
             setOpenPanels(exchange.uuid) 
            }}
            
            >
            {/* <Button onClick={console.log("Holaaa")}>Holla</Button> */}
              <Panel
              
                key={exchange.uuid}
                showArrow={true}
                header={(
                  <Row   key={exchange.uuid}>
                    <Col className='twent'>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    {/* <Col className='twent'>{millify(exchange.price)}</Col> */}
                    <Col className='twent'>{millify(exchange.numberOfMarkets)}</Col>
                    <Col className='twent'>{millify(exchange.price)}%</Col>
                  </Row>
                  )}
                  
              >
                <Col span={12}>{<Col>
                  <CheckCircleTwoTone twoToneColor={rock ?"#0071bd":"#ff0000"} />
                 <Ver is={rock}/>
                  {/* <Text>{console.log(exchange.recommended)}</Text> */}
                </Col>}</Col>
              </Panel>
            </Collapse>
          </Col>
        ))} 
      </Row>
    </>
  );
};

export default Exchanges;
