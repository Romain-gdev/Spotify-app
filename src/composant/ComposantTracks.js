import { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { addBookmark } from '../actions';
import {isFavorite, addFavorite} from '../features/counter/counterSlice'
import { useSelector, useDispatch } from 'react-redux';

/***
 * Get tracks data
 * @returns \{JSX.Element}
 */
function PageAlbumInfo(){
    const [accessToken, setToken] = useState();
    const [albums, setAlbum] = useState([]);

    const count = useSelector((state) => state.favorites.value);
    const dispatch = useDispatch();
    
    var idAlbum = window.location.pathname.substring(8)
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
            .then(data => setToken(data.access_token))
           
    }, []);

    useEffect(() =>{
        if(accessToken) Search()
    },[accessToken])

    var searchparam = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    }

    async function Search(){

        await fetch('https://api.spotify.com/v1/albums/' + idAlbum + '/tracks', searchparam)
            .then(response => response.json())
            .then(data => setAlbum(parseData(data.items)))
        
    }

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

    /***
     * Columns of antd Table
     * @type {[{dataIndex: string, title: string, key: string}, {dataIndex: string, title: string, key: string}, {dataIndex: string, title: string, key: string}, {dataIndex: string, title: string, render: (function(*)), key: string}, {dataIndex: string, title: string, render: render, key: string}]}
     */
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
        }
        ,
        {
            title:'Listen',
            dataIndex:'external_urls',
            key:'external_urls',
            render: (item) => <a href={item.spotify}>Spotify</a>

        },
        {
            title:'Favorite',
            dataIndex:'id',
            key:'explicit',
            render: (item) => <Button onClick={() => dispatch(addFavorite(item))}>Add</Button>
        }
    ]

    return(
        <div>
        {albums &&         
            <div className="mt-16">
            <Table className=" " dataSource={albums} columns={columns}  pagination={{ pageSize: 20 }}/>
         </div >
        }
        </div>

    )

}

export default PageAlbumInfo