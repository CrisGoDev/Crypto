import React from 'react';
import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  
  Tooltip,
  Legend,
  } from 'chart.js';
  
 
// import {Col,Row, Typography, Title} from 'antd';
import { Col, Row, Typography } from 'antd';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
  );

const { Title } = Typography;

const LineChart=({coinsHistory, curenPrice, coinName}) =>{
  const coinPrice=[];
  const coinTimestamp=[];
  let fech;

  for (let i = 0; i < coinsHistory?.data?.history?.length; i++) {
    coinPrice.push( coinsHistory?.data?.history[i].price);
    fech=new Date(coinsHistory?.data?.history[i].timestamp*1000);
    coinTimestamp.push(`${fech.getDate()}/${fech.getMonth()+1}/${fech.getFullYear()}`)
    
    
    
  }

  const data={
    labels:coinTimestamp,
    datasets:[
      {
        label:'Price in USD',
        data:coinPrice,
        fill:false,
        backgroundColor:'#0071bd',
        borderColor:'#0071bd'
      }
    ]
  }

  const options={
    scales:{
      yAxes:[
        {
          ticks:{
            beginAtZero:true,
          },
        },
      ],
    },
  };
  // const options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         id: 'A',
  //       type: 'linear',
  //       position: 'left',
          
  //       },
  //     ],
  //   },
  // };
  return (
      <>
     
      <Row className="chart-header">
          <Title level={2} className='chart-title' >{coinName} Price Chart</Title>
          <Col className="price-container">
           <Title level={5} className="price-change">{coinsHistory?.data?.change}%</Title>
           <Title level={5} className="current-price">Current {coinName} Price:$ {curenPrice}</Title> 
          </Col>
      </Row>
      <Line data={data} options={options}/>
      </>
  );
}

export default LineChart;
