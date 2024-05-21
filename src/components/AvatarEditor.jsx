import React, { useState } from "react";
import Avatar from "react-avatar-edit";

const AvatarEditor = ({avatarUrl, setAvatarUrl}) => {
  const [preview, setPreview] = useState(null);
  const src = avatarUrl;

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (preview) => {
    setPreview(preview);
  };

  const onBeforeFileLoad = (elem) => {
    console.log(elem.target.files[0]);
    if (elem.target.files[0].size > 716800) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };

  const onFileLoad = (file) => {
    // console.log(file);
    // setAvatarUrl(URL.createObjectURL(file));
  };

  return (            
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '80px' }}>
      <Avatar
        width={390}
        height={300}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        onFileLoad={onFileLoad}
        src={src}
      />
      {/* <img src={preview} alt="No file Preview" /> */}
    </div>
  );
};

export default AvatarEditor;

