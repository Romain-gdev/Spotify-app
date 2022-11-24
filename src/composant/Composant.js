import '../style/App.css';
import { useEffect, useState } from 'react';
import { Input, Avatar, Button, Table} from 'antd';
import {Link} from 'react-router-dom';

function AlbumComposant(){

  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setToken] = useState("");
  const [albums, setAlbums] = useState([]);

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

  async function Search() {
    console.log("search for " + searchInput)

    var searchparam = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    var artistId = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchparam)
      .then(response => response.json())
      .then(data => { return data.artists.items[0].id })
      .catch(e => console.log(e))


        await fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums' + '?include_groups=album&market=US&limit=50', searchparam)
        .then(response => response.json())
        .then(data => setAlbums(mapdata(data.items)))
        .catch(e => console.log(e)) 
      
  }

  const mapdata = (tab) =>{
    for(var i = 0;i<tab.length;i++){
      Object.assign(tab[i],{'key':i})
    }
    return tab
  }



  const renderimages= (images) => {
    if(images[0]){return <Avatar src={images[0].url} />}
    else{return null}
    }

  const columns = [
    {
      title:'Album',
      dataIndex:'images',
      key:'photo_album',
      render: (item)=>renderimages(item)
    },
    {
      title:"Name",
      dataIndex:'name',
      key:'name',
      render: (item) => <Link to={item}>{item}</Link>
  },
  {
    title:"Date",
    dataIndex:'release_date',
    key:'release_date'
  },
  {
    title:'Tracks',
    dataIndex:'total_tracks',
    key:'tracks'
  }
  ];
  
  return (
    
    <div className="mt-16">
          <div className='mx-8 grid grid-cols-9'>
            <div className='col-span-8'> 
            <Input
              placeholder='hello'
              onChange={event => setSearchInput(event.target.value)}
              onSubmit={ Search }>
            </Input> 
        </div>
        <Button className="bg-[#292929] text-[#81b71a] font-bold" onClick={Search}>Search</Button> 
        </div>    

        <Table className="mt-8" dataSource={albums} columns={columns}  pagination={{ pageSize: 20 }}/>
             
    </div >
 
  );
}

export default AlbumComposant;
