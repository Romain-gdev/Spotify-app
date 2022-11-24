import { useEffect, useState } from 'react';
import { Table } from 'antd';

/***
 * Get tracks data
 * @returns {JSX.Element}
 */
function PageAlbumInfo(){
    const [accessToken, setToken] = useState("");
    const [albums, setAlbum] = useState([]);

    console.log(window.location.pathname.substring(8))
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
            .then(data => setToken(data.access_token));
    }, [albums === null]);

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
            .then(data => setAlbum(data.items))
    }

    Search()

    /***
     * tab to concatenate artists name,
     * artists tab in [albums] doesn't match with Antd Table
     * @type {*[]}
     */
    var artists = []
    albums.forEach(element => {if(element.artists) artists.push(element.artists)})

    /**
     * Concatenate artists name
     */
    for(var i = 0;i<artists.length;i++) {
        var noms = ""
        if(artists[i].length != 1){
            artists[i].forEach((element) => {noms += " "+element.name})
            Object.assign(albums[i],{'artist':noms})
            console.log(albums)
        }else{
            artists[i].forEach((element) => {Object.assign(albums[i],{'artist':element.name})})
        }
    }


    /***
     * Columns of antd Table
     * @type {[{dataIndex: string, title: string, key: string}, {dataIndex: string, title: string, key: string}, {dataIndex: string, title: string, key: string}, {dataIndex: string, title: string, render: (function(*)), key: string}, {dataIndex: string, title: string, render: render, key: string}]}
     */
    const columns = [
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
            title:'',
            dataIndex: 'explicit',
            key:'explicit',
            render: (item) => { if(item.toString() == "true") <p>explicit</p>}
        }

    ]

    return(
        <div className="mt-16">
            <Table className="mt-8" dataSource={albums} columns={columns}  pagination={{ pageSize: 20 }}/>
        </div >
    )

}

export default PageAlbumInfo