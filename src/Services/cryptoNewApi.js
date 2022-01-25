import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const cryptoNewsHeader=  {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '06689421e7mshbf3b8228c6d7a10p1c613djsn78e19ac784c2'
  }

const baseUrl= 'https://bing-news-search1.p.rapidapi.com'

const createRequest=(url) =>({
    url,headers:cryptoNewsHeader
})

export const cryptoNewsApi=createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery:fetchBaseQuery({ baseUrl }),
    endpoints:(builder) => ({
        getCryptoNews:builder.query({
            query: ({newsCategory ,count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=off&textFormat=Raw&freshness=Day&count=${count}`),

        })
    })
});


export const {
    useGetCryptoNewsQuery
    ,}=cryptoNewsApi;