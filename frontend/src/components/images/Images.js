import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Images = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetch("/images")
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  const handleImageUpload = (event) => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("description", description);
      formData.append("date", selectedDate.toISOString());

      fetch("/image", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json)
        .then((data) => {
          console.log("Image uploaded successfully:", data);
          setSelectedImage(null);
          setDescription("");
          setSelectedDate(new Date());

          fetch("/images")
            .then((response) => response.json())
            .then((data) => {
              setImages(data);
            })
            .catch((error) => {
              console.error("Error fetching images:", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h2>Upload a masterpiece</h2>
      <input type="file" onChange={handleImageChange} />
      <div>
        <h5>Description</h5>
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
        <h5>Pick a date</h5>
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
      </div>

      <div>
        <button onClick={handleImageUpload}>Submit</button>
      </div>

      {images.map((image) => (
        <div key={image.id}>
          <img src={`/image/${image.filename}`} alt={image.filename} />
          <div>Date: {image.date}</div>
          <div>Description: {image.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Images;
