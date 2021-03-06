
import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
  //const host = "https://mernnividlimbasiya.herokuapp.com"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all notes
  const getNotes = async () => {
    //To do API call

    const response = await fetch(`/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
   
    setNotes(json)
    console.log(json);

  }
  // Add a note
  const addNote = async (title, description, tag) => {
    //To do API call

    const response = await fetch(`/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
   }
     //Delete a note

  const deleteNote = async (id) => {
    //TODO:API Call
    const response = await fetch(`/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "token": localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json);
   
    const newNotes = notes.filter((note) =>   { return note._id !== id  })
    setNotes(newNotes)

  }
  //Update a Note
   const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    console.log(json);
    

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client


    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
     

    }
    setNotes(newNotes);

  }


  return (
    <NoteContext.Provider value={{notes,addNote,getNotes,editNote,deleteNote}}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;