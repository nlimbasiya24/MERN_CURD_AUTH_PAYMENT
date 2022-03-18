
import AddNote from "./AddNote"
import { useContext,useRef,useState  } from "react";
import NoteItem from "./Noteitem";
import NoteContext from "../../context/NoteContext";
import { useNavigate } from "react-router-dom";
import React, { useEffect} from "react";

const Notes = (props) => {

  const context = useContext(NoteContext)
  let history =useNavigate();
  const { notes,getNotes,editNote} = context;
  useEffect(() => {
    // const abc = localStorage.getItem('token')
    //     console.log(abc);
    if(localStorage.getItem('token')){
   getNotes();

    //console.log("Nivid");
  
    }
    else{
        history.push("/login")

    }
      // eslint-disable-next-line 
}, [])

const ref = useRef(null)
const refClose = useRef(null)

const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})

const updateNote = (currentNote) => {
   // console.log("kshfkshfskh");
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
   
}

const handleClick=(e)=>{
   
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully","success")
  

}

const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})//sperad Operator

}
  return (
    <>

    <AddNote  showAlert={props.showAlert}/>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="my-3">
                                    <div className="mb-4">
                                        <label htmlFor="title" className="from-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp"
                                            onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="from-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="from-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
                                    </div>

                                  
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>

    <div className="row my-3">
           
           <h2 className="mx-3">Your Notes</h2>
           <div className="container mx-3"> 
           {notes.length===0 && 'No notes to display '}
             
           </div> 

           {notes.map((note) => {
               return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert}  note={note}/>
           })}

       </div>

    </>
  )
}

export default Notes
