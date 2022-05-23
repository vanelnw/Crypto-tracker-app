import styled from '@emotion/styled';
import { async } from '@firebase/util';
import { Avatar, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'

const InfoProvider = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems:"center",
    justifyContent: 'space-between',
}))

const NewsPage = () => {
    const [news, setNews] = useState([]);


const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  const fetchNews = async (newsCategory) => {

            try {
          const  data= await axios.get(
            `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day`,
            {
              headers: {
                "X-BingApis-SDK": "true",
                "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
                "X-RapidAPI-Key":
                  "444f992462msh14df91836ca4084p100bffjsn8d1ddeecae90",
              },
            }
          );
                console.log(data)
          setNews(data.data);
        } catch (error) {
          console.log(error);
        }
    }
        useEffect(() => {
        fetchNews("Cryptocurrency")
        }, [])
    
    if(!news?.value) return (<Box sx={{height:"100%", display:"flex", justifyContent:"center"}}> loading...</Box>)
    
  return (
    <Grid container spacing={3} p={4}>
      {news?.value?.map((info, i) => (
        <Grid item key={i} xs={6} sm={4} md={3}>
          <Paper elevation={4} sx={{ padding: "5px" }}>
            <a href={info.url} target="_blank" rel="noreferrer">
              <Box sx={{display:"flex", flexDirection:"column", gap:2}}>
                <Box display="flex">
                  <Typography
                    sx={{ width: "70%", color: "black" }}
                    variant="subtitle1"
                  >
                    {info.name}
                  </Typography>
                  <img
                    src={info?.image?.thumbnail?.contentUrl || demoImage}
                    alt=""
                    style={{ height: "100px", width: "30%" }}
                  />
                </Box>
                <Typography
                  sx={{ color: "black", mb: "10px" }}
                  variant="subtitle3"
                >
                  {info.description.length > 100
                    ? `${info.description.substring(0, 100)}...`
                    : info.description}
                </Typography>
                <InfoProvider>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={
                        info.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt=""
                      sx={{mr:1,}}
                    />
                    <p className="provider-name" >{info.provider[0]?.name}</p>
                  </Box>
                  <p>{moment(info.datePublished).startOf("ss").fromNow()}</p>
                </InfoProvider>
              </Box>
            </a>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default NewsPage