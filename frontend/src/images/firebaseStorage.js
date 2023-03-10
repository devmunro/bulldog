import { storage } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { useState } from "react";


export default function FirebaseStorage({imageBase}) {

  const [image, setImage] = useState("");
    const imageURL = `icons/${imageBase}`
  // Create a child reference
  const imagesRef = ref(storage, imageURL);
  // imagesRef now points to 'images'
if(imageBase !== "")
  // Get the download URL
  getDownloadURL (imagesRef)
    .then((url) => {
      setImage(url);
    })
    .catch((error) => {
      console.log(error);
    });


    if(imageBase === "manworkingout.png") {

      return <img className="h-64" src={image} alt="thing"/>
    }else if (imageBase === "homepage.jpg") {
      return <img className="w-full" src={image} alt="thing"/>
    }
  return <img className="h-12 w-12" src={image} alt="thing"/>
}
