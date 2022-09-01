import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { Videos, ChannelCard } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI'

 
const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])
  const { id } = useParams(); //to fetch the id from the searchbar

  console.log(channelDetail, videos)

  //this is the use effect and it will fetch as the id changed
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
    .then((data) => {
      setChannelDetail(data?.items[0]); 
    })

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data) => {
      setVideos(data?.items); 
    })
  }, [id])

  

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
          zIndex: 10,
          height: '200px',
          backgroundImage : `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})`,
          // backgroundRepeat:'no-repeat',
          // backgroundSize: 'cover'
        }} />
        <ChannelCard channelDetail={channelDetail} marginTop='-93px' />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: '200px' } }} />
          <Videos videos={videos} />
        
      </Box>
    </Box>
  )
}

export default ChannelDetail