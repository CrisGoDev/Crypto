import React from 'react';
import {Select,Typography, Row,Card,Col,Avatar} from 'antd'
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../Services/cryptoNewApi';
import { useGetCryptosQuery } from '../Services/cryptoApi';
import { useState } from 'react';


const {Text,Title}=Typography;
const {Option}=Select;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';



const News = ({simplified}) => {





  const [newCategory, setnewCategory] = useState('Cryptocurrency');
  const {data:cryptoNews}=useGetCryptoNewsQuery({newsCategory:newCategory,count:simplified? 6 : 12});
  const {data}=useGetCryptosQuery(100);
  



  if(!cryptoNews?.value) return "...........Loading";
  // console.log(cryptoNews);
  return (
    <Row gutter={[24,24]}>
      {!simplified &&(
        <Col span={24}>
          <Select
          showSearch
          className='select-news'
          placeholder="select a news Crypto"
          optionFilterProp='children'
          onChange={(value)=> setnewCategory(value)}
          filterOption={(input,option)=> option.children.toLowerCase().indexOf(input.toLocaleLowerCase())>=0}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin)=><Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news,i)=>(
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} target='_blank' rel='noreferrer'>
              <div className='news-image-container'>
                <Title className='news-title' level={4} > {news.name}</Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt='News'/>

              </div>
              <p>
                {news.description>100? `${news.description.substring(0,100)}}...`
                :news.description}
              </p>
              <div className='provider-container'>
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='news'/>
                  <Text className='provider-name'>{news.provider[0].name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
