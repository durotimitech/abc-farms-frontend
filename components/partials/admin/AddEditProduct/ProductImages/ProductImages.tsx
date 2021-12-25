import { Alert, Card, Image } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { storage } from "../../../../../firebase/index";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { _error } from "../../../../../utilities/_error";
import { localStorageVars } from "../../../../../utilities/constants";

const ProductImages = (props) => {
  const [alert, setAlert] = useState("");
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    if (props.preview) {
      setPreview(props.preview);
    }
  }, [props.preview]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const uploadButton = () => {
    return (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    setLoading(true);
    const file = e.target.files[0];
    if (file.type.substr(0, 5) === "image") {
      handleFirebaseUpload(file);
    } else {
      setImage(null);
      setAlert("Please upload an image!");
    }
  };

  const handleFirebaseUpload = (image) => {
    const uploadTask = storage.ref(`images/products/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // setProgress(progress);
      },
      (error) => {
        setLoading(false);
        _error(error);
      },
      () => {
        storage
          .ref("images")
          .child("products")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            localStorage.setItem(localStorageVars.PRODUCTIMAGEURL, url);
            setImage(image);
            setAlert("");
            setLoading(false);
          });
      }
    );
  };

  return (
    <>
      <label>Upload Product Image</label>
      {alert ? <Alert message={alert} type="error" /> : ""}

      <Card
        hoverable
        style={{
          width: 100,
          height: 100,
          backgroundColor: "#FAFAFA",
          textAlign: "center",
        }}
        onClick={(e) => {
          e.preventDefault();
          fileInputRef.current.click();
        }}
      >
        {!loading && preview ? (
          <Image
            src={preview}
            alt="Product Image"
            width="50"
            height="50"
            preview={false}
          />
        ) : (
          uploadButton()
        )}
      </Card>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
      />
    </>
  );
};

export default ProductImages;
