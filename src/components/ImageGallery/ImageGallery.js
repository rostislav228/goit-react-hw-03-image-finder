import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";

export default function ImadeGallery({ query }) {
  return (
    <ul className={s.ImageGallery}>
      {query.map(({ tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          tags={tags}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          key={webformatURL}
        ></ImageGalleryItem>
      ))}
    </ul>
  );
}
