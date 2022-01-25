// import { createApi } from '@reduxjs/toolkit/dist/query'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const cryptoApiHeaders={
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '06689421e7mshbf3b8228c6d7a10p1c613djsn78e19ac784c2'

}
const cryptoApiHeadersPeriod={
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '06689421e7mshbf3b8228c6d7a10p1c613djsn78e19ac784c2'

}
const baseUrl='https://coinranking1.p.rapidapi.com'

const createRequest=(url)=>({url, headers:cryptoApiHeaders});
const createRequestPeriod=(url)=>({url, headers:cryptoApiHeaders});
export const cryptoApi=createApi({
    reducerPath:'cryptoApi',
    baseQuery:fetchBaseQuery({ baseUrl }),
    endpoints:(builder) => ({
        getCryptos:builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),

        getCryptosDetails:builder.query({
            query: (coinId)=>createRequest(`/coin/${coinId}`),
        }),

        getCryptosHistory:builder.query({
            query: ({coinId,timePeriod})=>createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`),
        })
        // getCryptosHistory:builder.query({
        //     query: ({coinId,timeperiod})=>createRequest(`coin/${coinId}`),
        // })
        
    })
});








export const{
    useGetCryptosQuery,
    useGetCryptosDetailsQuery,
    useGetCryptosHistoryQuery
}=cryptoApi;
// var options = {
//     method: 'GET',
//     url: ,
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       limit: '50',
//       offset: '0',
//       orderBy: '24hVolume',
//       orderDirection: 'desc'
//     },
//     headers: {
//      }
//   };