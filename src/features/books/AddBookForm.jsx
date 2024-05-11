import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { bookAdded } from "./booksSlice"
import { selectAllUsers } from "../users/usersSlice"



const AddBookForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const users = useSelector(selectAllUsers)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setTitle(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)

  const onSaveBookClicked = () => {
    if (title && contet) {
      dispatch(bookAdded(title, content, userId))
      setTitle('')
      setContent('')
    }
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  console.log('users :>> ', users);

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
        {user.name}
    </option>
))

  return (
    <section>
        <h2>Add a New Book to the list</h2>
        <form>
            <label htmlFor="bookTitle">Book Title:</label>
            <input
                type="text"
                id="bookTitle"
                name="bookTitle"
                value={title}
                onChange={onTitleChanged}
            />
            <label htmlFor="bookAuthor">Author:</label>
            <select id="bookAuthor" value={userId} onChange={onAuthorChanged}>
                <option value=""></option>
                {usersOptions}
            </select>
            <label htmlFor="bookContent">Content:</label>
            <textarea
                id="bookContent"
                name="bookContent"
                value={content}
                onChange={onContentChanged}
            />
            <button
                type="button"
                onClick={onSaveBookClicked}
                disabled={!canSave}
            >Save Book</button>
        </form>
    </section>
)
}

export default AddBookForm