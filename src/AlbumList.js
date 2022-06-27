import React, { useState, useEffect } from "react";

function AlbumList({ user = {} }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    setAlbums([]);

    const abortController = new AbortController();
    async function getAlbums() {
      if (!user.id) return console.log("no user");
      try {
        const albumList = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`,
          { signal: abortController.signal }
        );
        const albumsFromAPI = await albumList.json();
        setAlbums(albumsFromAPI);
      } catch (error) {
        if (error.name === "AbortError") console.log("aborted:", user.id);
        else throw error;
      }
    }
    getAlbums();

    return () => {
      document.title = "";
      abortController.abort();
    };
  }, [user]);

  if (user.id) {
    return (
      <>
        <h1>{user.name} Albums</h1>

        <ul>
          {albums.map((album) => (
            <li key={album.id}>
              {album.id} - {album.title}
            </li>
          ))}
        </ul>
      </>
    );
  }
  return <p>Please click on a user name to the left</p>;
}

export default AlbumList;
