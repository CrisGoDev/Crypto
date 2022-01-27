import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptosDetailsQuery , useGetCryptosHistoryQuery} from '../Services/cryptoApi';
import LineChart from './LineChart';


const { Title, Text } = Typography;
const { Option } = Select
const CryptoDetails = () => {


  const { coinId } = useParams();
  const [timePeriod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetCryptosDetailsQuery(coinId);
  const { data:coinHistory} = useGetCryptosHistoryQuery({coinId,timePeriod});
  
  
  const cryptoDetails = data?.data?.coin;
  


  if(isFetching) return '..Loading'
  

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];
  
  if(cryptoDetails===undefined)return '..Loading'
  
  
  
  

  return (
    <Col className='coin-detail-container'>
      <Title level={3} className='show-more' ><Link to={`/exchanges/${coinId}` }>Exhanges</Link></Title>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails.name}
          ({cryptoDetails.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in Us Dollars
          View value Statistic market cap and supply
        </p>
        </Col>
        
        <Select defaultValue="7d"
          className='select-time-period' placeholder="select Time"
          onChange={(value) => setTimeperiod(value)}
        >

          {time.map((date) => <Option key={ date}>{date}</Option>)}
        </Select>
        <LineChart coinsHistory={coinHistory} curenPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>


        <Col className='stats-container'>
          
          <Col className='coin-value-statistic'>
            <Col className='coin-value-statistic-heading'>
              <Title level={3} className='coin-detail-heading'>
                {cryptoDetails.name} Value Statistic 
              </Title>
              <p>
                An overview showing the statistic of stats {cryptoDetails.name}
              </p>

            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                  {/* <Text>{value}</Text> */}
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))}
          </Col>

          <Col className='other-stats-info'>
            <Col className='coin-value-statistic-heading'>
              <Title level={3} className='coin-detail-heading'>
                {/* {cryptoDetails.name} Value Statistic */}
                Other Statistic
              </Title>
              <p>
                AN overview showing the stats of all Cryptocurrencies and many more, do you wanna see?
              </p>

            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                  {/* <Text>{value}</Text> */}
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>

        <Col className='coin-desc-link'>
          <Row className='coin-desc'>
            <Title level={3} className='coin-details-heading'>
              What is {cryptoDetails.name}
              {HTMLReactParser(cryptoDetails.description)}
            </Title>
          </Row>
          <Col className='coin-links'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} Links
              {cryptoDetails.links.map((link)=>(
                <Row className='coin-link' key={link.name}>
                  <Title level={5} className='link-name'>
                    {link.type}
                  </Title>
                  <a href={link.url} target='_blank' rel='noreferrer' >
                    {link.name}
                  </a>
                </Row>
              ))}
            </Title>
          </Col>
        </Col>


      </Col>
   
  );
};

export default CryptoDetails;
