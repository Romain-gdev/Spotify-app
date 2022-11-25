import React from "react";


export default function NewBookmark(props) {
  const [title, setTitle] = React.useState("");
  const [url, setUrl] = React.useState("");

  const handleInputChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "url") {
      setUrl(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" || url === "") {
      return;
    } else {
      let state = { title, url };
      console.log(state);
      props.onAddBookmark(state);
      handleReset();
    }
  };

  const handleReset = () => {
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        
        type="text"
        placeholder="Title"
        name="title"
        onChange={handleInputChange}
        value={title}
      />

      <input
        type="text"
        placeholder="URL"
        name="url"
        onChange={handleInputChange}
        value={url}
      />

      <button type="submit">
        Add Bookmark
      </button>
      <button
        onClick={handleReset}
        type="button"
      >
        Reset
      </button>
    </form>
  );
}
