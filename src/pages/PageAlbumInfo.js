import { useEffect, useState } from 'react';
import {Table} from 'antd';

function PageAlbumInfo(){
    const [accessToken, setToken] = useState("");
    const [albums, setAlbum] = useState([]);

    var nameAlbum = window.location.pathname.substring(8)

    useEffect(() => {
        var authParam = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'grant_type=client_credentials&client_id=b5486f3cf799494fb48e8e7228b9867b&client_secret=9832aa914418470abe7f69a18888ee95'
        }
        fetch('https://accounts.spotify.com/api/token', authParam)
          .then(result => result.json())
          .then(data => setToken(data.access_token));
      }, []);

      var searchparam = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }

async function Search(){

    await fetch('https://api.spotify.com/v1/search?q=' + nameAlbum + '&type=album', searchparam)
      .then(response => response.json())
      .then(data => console.log(data.albums.items))
}

Search()

const columns = [
{
    title:'Track',
    dataIndex:'name',
    key:'name',
},
{
    title:'Artists',
    dataIndex:'artists',
    key:'artists',
}
,
{
    title:'Date',
    dataIndex:'release_date',
    key:'release_date',
}
]

if(albums == undefined){
    console.log('dez')
    return <div>Undefined !</div>
}else{
    return(
    
        <div className="mt-16">
            
            
              
        </div >
        )
        
}



}

export default PageAlbumInfo