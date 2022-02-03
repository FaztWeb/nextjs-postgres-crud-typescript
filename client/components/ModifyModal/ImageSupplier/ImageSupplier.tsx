import { churchToModify$, imageSupplier$ } from 'lib/modal';
import { useEffect, useReducer, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useToggle from 'hooks/useToggle';

import { CgCloseO } from 'react-icons/cg';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import imageSupplierStyle from './imageSupplier.module.css';

interface Action {
  type: 'REMOVE' | 'ADD';
  src: string;
  name: string;
  file: File;
}

interface photoData {
  src: string;
  name: string;
  file: File;
}

export default function ImageSupplier() {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { state: show, toggle } = useToggle();

  /**
   *  adding and deleting images from the preview section
   */
  const [photos, dispatchPhotos] = useReducer(
    (prev: photoData[], action: Action): photoData[] => {
      switch (action.type) {
        case 'REMOVE':
          return prev.filter(({ src }) => src !== action.src);
        case 'ADD':
          if (prev.find(({ name }) => name === action.name)) {
            return prev;
          } else
            return [
              ...prev,
              { src: action.src, file: action.file, name: action.name },
            ];
      }
    },
    [] as photoData[]
  );

  return (
    <div className={imageSupplierStyle.container}>
      <input
        type="file"
        ref={inputRef}
        multiple
        // the input will be invisible it's styling does not fit our preferred design
        className={imageSupplierStyle.invisibleInput}
        onChange={(event) => {
          /**
           * when the input receives images, it will store them (along with some details about the files)
           * inside **photos**. The metadata, will help display the thumbnail (through the **src**), avoid
           * duplicates (as the **name** will become the React key at display -keys must be unique so two images
           * with the same name won't meet the criteria-) and post the images to the backend (through the **file**)
           */
          if (event.target.files && event.target.files[0]) {
            dispatchPhotos({
              type: 'ADD',
              src: URL.createObjectURL(event.target.files[0]),
              name: event.target.files[0].name,
              file: event.target.files[0],
            });
            imageSupplier$.next([
              ...photos.map((photo) => photo.file),
              event.target.files[0],
            ]);
          }
        }}
      />
      <div className={imageSupplierStyle.subtitle}>
        Fotografiile pot ajuta utilizatorii sa recunoasca mai usor locatia
      </div>
      <motion.button
        layout
        ref={buttonRef}
        className={imageSupplierStyle.button}
        onMouseEnter={toggle}
        onMouseLeave={toggle}
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <motion.div layoutId="Ceva" className={imageSupplierStyle.text}>
          Adauga fotografii
        </motion.div>
        {show ? (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            className={imageSupplierStyle.iconDiv}
          >
            <MdOutlinePhotoCamera className={imageSupplierStyle.icon} />
          </motion.div>
        ) : null}
      </motion.button>

      <div className={imageSupplierStyle.preview}>
        {photos.map(({ src, file, name }) => (
          <button
            onKeyDown={(event) => {
              // delete images upon focusing and pressing the enter key on any given image
              event.key === 'Enter'
                ? dispatchPhotos({
                    type: 'REMOVE',
                    src,
                    name,
                    file,
                  })
                : 0;
              imageSupplier$.next(photos.map((photo) => photo.file));
            }}
            key={name}
            className={imageSupplierStyle.hideButton}
          >
            <div className={imageSupplierStyle.thumbnail}>
              <CgCloseO
                onClick={() => {
                  // deleting image on clicking the close icon
                  dispatchPhotos({
                    type: 'REMOVE',
                    src,
                    name,
                    file,
                  });
                }}
                className={imageSupplierStyle.closeIcon}
              />
              <img
                src={src}
                onError={() => {
                  // ERROR HANDLING
                }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
