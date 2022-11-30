import '../style/App.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Table } from 'antd';

function Composantfavorites(){

    const [accessToken, setToken] = useState();
    const [musictrack, setmusictrack] = useState([]);
    const count = useSelector((state) => state.favorites.value)
    
    useEffect(()=>{
        var authParam = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=b5486f3cf799494fb48e8e7228b9867b&client_secret=9832aa914418470abe7f69a18888ee95'
        }
        fetch('https://accounts.spotify.com/api/token', authParam)
            .then(result => result.json())
            .then(data => setToken(data.access_token))
           
    },[count])

    /**
     * count is a tab with music's id;
     * To fetch all music we have to create a promise all
     * !! We fetch if we got accessToken
     */
    useEffect(() =>{

        if(accessToken){
            const promiseArray = []
            count.forEach((element) =>{
                promiseArray.push(search(element))
            })
            Promise.all(promiseArray).then((val) => {setmusictrack(parseData(val))})
           
        }
    },[accessToken])


/**
 *  Function to concatenate artists name,
 * artists tab in [albums] doesn't match with Antd Table
 * @param {*} tab 
 * @returns \{tab with artist names concatenated}
 */
function parseData(tab){
    
    var artists = []
    tab.forEach(element => {if(element.artists) artists.push(element.artists)})
   
    /**
     * Concatenate artists name
     */
    for(var i = 0;i<artists.length;i++) {
        var noms = ""
        if(artists[i].length != 1){
            artists[i].forEach((element) => {noms += " "+element.name})
            Object.assign(tab[i],{'artist':noms})
        }else{
            artists[i].forEach((element) => {Object.assign(tab[i],{'artist':element.name})})
        }
    }
    return tab

}

    var searchparam = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    }

    async function search(id){

       return fetch('https://api.spotify.com/v1/tracks/'+id,searchparam)
            .then(response => response.json())
        
    }
const columns = [
    {
        title:'Disc',
        dataIndex:'disc_number',
        key:'disc_number'
    },
    {
        title:'#',
        dataIndex: 'track_number',
        key:'track_number'
    },
    {
        title:'Track',
        dataIndex:'name',
        key:'name',
    },
    {
        title:'Artists',
        dataIndex:'artist',
        key:'artist',
    },
    {
        title:'Listen',
        dataIndex:'external_urls',
        key:'external_urls',
        render: (item) => <a href={item.spotify}>Spotify</a>

    },
]

/**
 * If we've got 0 favs, then we notice it to the user
 */
    return (
        <div>{
            musictrack.length != 0 &&             
        <div className='mt-16'>
        <Table dataSource={musictrack} columns={columns} pagination={{ pageSize: 20 }}></Table>
    </div>}
    {musictrack.length == 0 &&
        <div><h1  className='flex justify-center text-xl' >Oups ! No favs</h1></div>
    }
        </div>
    )
}

export default Composantfavorites