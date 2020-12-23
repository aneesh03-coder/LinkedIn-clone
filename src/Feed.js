
import React,{useState,useEffect} from 'react'
import "./Feed.css"
import CreateIcon from "@material-ui/icons/Create"
import InputOption from './InputOption'
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import Post from './Post';
import { db } from './firebase';
import firebase from "firebase";
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from "react-flip-move"

function Feed() {
    const [input,setInput]=useState("");
    const [posts,setPosts]=useState([]);
    const user=useSelector(selectUser);

    useEffect(()=>{
       db.collection("posts")
       .orderBy("timestamp","desc")
       .onSnapshot(snapshot=>(
          setPosts(snapshot.docs.map(doc=>(
              {
                id:doc.id,
                data:doc.data()  
              }
          ))) 
       )) 
    },[])

    const sendPost=e=>{
        e.preventDefault();
        db.collection("posts").add({
            name:user.displayName,
            description:user.email,
            message:input,
            photoUrl:user.photoURL,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    };


    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon/>
                    <form action="">
                        <input type="text" value={input} onChange={e=>setInput(e.target.value)}/>
                        <button type="submit" onClick={sendPost}>Send</button>
                    </form>
                </div>
                <div className="feed__inputOptions">
                   {/* InputOptions  */}
                   <InputOption Icon={ImageIcon} title="Photo" color="#70b5f9"/>
                   <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E"/>
                   <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD"/>
                   <InputOption Icon={CalendarViewDayIcon} title="Write article" color="#7FC15E"/>                   
                </div>
            </div>
            {/* Posts */}
            <FlipMove>
            {posts.map(({id,data:{name,description,message,photoUrl}})=>(
                <Post
                    key={id}
                    name={name}
                    description={description}
                    message={message}
                    photoUrl={photoUrl}
                />
            ))}
            </FlipMove>

        </div>
    )
}

export default Feed
