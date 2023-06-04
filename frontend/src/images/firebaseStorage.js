import { storage } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";

export default function FirebaseStorage({ imageBase }) {
  const [image, setImage] = useState("");
  const imageURL = `icons/${imageBase}`;

  useEffect(() => {
    if (imageBase !== "") {
      const imagesRef = ref(storage, imageURL);

      getDownloadURL(imagesRef)
        .then((url) => {
          setImage(url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [imageBase, imageURL]);

  if (imageBase === "manworkingout.png") {
    return <img className="h-64" src={image} alt="thing" />;
  } else if (imageBase === "homepage.jpg") {
    return <img className="w-full" src={image} alt="thing" />;
  }
  return <img className="h-12 w-12" src={image} alt="thing" />;
}
