import React from "react";
import { connect } from "react-redux";
import { deleteBookmark } from "../actions";
import Bookmark from "../component/BookMark";

const BookmarkList = ({ bookmarks, onDelete }) => {
  console.log("bookmark list");
  return (
    <div>
      {bookmarks.map((bookmark) => (
        <Bookmark bookmark={bookmark} onDelete={onDelete} key={bookmark.id} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    bookmarks: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (id) => {
      dispatch(deleteBookmark(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkList);
