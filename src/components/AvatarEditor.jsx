import React, { useState } from "react";
import Avatar from "react-avatar-edit";

const AvatarEditor = ({avatar, setImgContent}) => {
  const src = avatar;

  const onClose = () => {
    setImgContent(null);
  };

  const onCrop = (preview) => {
    console.log(preview);   
    setImgContent(preview);
  };

  const onBeforeFileLoad = (elem) => {
    console.log(elem.target.files[0]);
    if (elem.target.files[0].size > 716800) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };

  return (            
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '80px' }}>
      <Avatar
        width={390}
        height={300}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={src}
      />
      {/* <img src={preview} alt="No file Preview" /> */}
    </div>
  );
};

export default AvatarEditor;

