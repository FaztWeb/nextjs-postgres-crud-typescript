import { churchToModify$ } from 'lib/modal';
import { useEffect, useReducer, useRef, useState } from 'react';

import { CgCloseO } from 'react-icons/cg';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import imageSupplierStyle from './imageSupplier.module.css';

interface Action {
  type: 'REMOVE' | 'ADD';
  src: string;
  url: string;
  file: File;
}

interface photoData {
  src: string;
  url: string;
  file: File;
}

export default function ImageSupplier() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imagePrefix, setImagePrefix] = useState<string>('');
  const [photos, dispatchPhotos] = useReducer(
    (prev: photoData[], action: Action): photoData[] => {
      switch (action.type) {
        case 'REMOVE':
          return prev.filter(({ src }) => src !== action.src);
        case 'ADD':
          if (prev.find(({ url }) => url === action.url)) {
            return prev;
          } else
            return [
              ...prev,
              { src: action.src, file: action.file, url: action.url },
            ];
      }
    },
    [] as photoData[]
  );

  const deleteImage = (src: string, file: File, url: string) => {
    dispatchPhotos({
      type: 'REMOVE',
      src,
      url,
      file,
    });
  };

  useEffect(() => {
    const subscribe = churchToModify$.subscribe((value) => {
      console.log(value);
      setImagePrefix(value);
    });
    () => {
      subscribe.unsubscribe();
    };
  }, []);

  return (
    <div className={imageSupplierStyle.container}>
      <button
        className={imageSupplierStyle.button}
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <div className={imageSupplierStyle.text}>Adauga fotografii</div>
        <MdOutlinePhotoCamera className={imageSupplierStyle.icon} />
      </button>
      <input
        type="file"
        ref={inputRef}
        multiple
        className={imageSupplierStyle.invisibleInput}
        onChange={(event) => {
          if (event.target.files && event.target.files[0]) {
            dispatchPhotos({
              type: 'ADD',
              src: URL.createObjectURL(event.target.files[0]),
              url: event.target.files[0].name,
              file: event.target.files[0],
            });
          }
        }}
      />
      <div className={imageSupplierStyle.subtitle}>
        Fotografiile pot ajuta utilizatorii sa recunoasca mai usor locatia
      </div>
      <div className={imageSupplierStyle.preview}>
        {photos.map(({ src, file, url }) => (
          <button
            onKeyDown={(event) => {
              event.key === 'Enter' ? deleteImage(src, file, url) : 0;
            }}
            key={url}
            className={imageSupplierStyle.hideButton}
          >
            <div className={imageSupplierStyle.thumbnail}>
              <CgCloseO
                onClick={() => {
                  deleteImage(src, file, url);
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
      <button
        className={imageSupplierStyle.submit}
        onClick={async () => {
          const data = new FormData();
          photos.map((photo) => data.append(imagePrefix, photo.file));
          const result = await fetch('api/images/images', {
            body: data,
            method: 'POST',
          });
          console.log(result);
        }}
      >
        SEND
      </button>
    </div>
  );
}
