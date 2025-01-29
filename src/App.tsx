import { useState } from "react";
import Carousel from "./components/ui/carousel";

function App() {
  const [images, setImages] = useState<{ src: string }[]>([])
  const imgHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length < 1) return
    setImages([])
    const newImages: { src: string }[] = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        newImages.push({ src: reader.result as string });
        if (newImages.length === files.length) setImages(newImages);
      };
    });
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center px-4 gap-8 overflow-x-hidden">
      <div className="w-screen flex justify-center">
        <input type="file" name='images' accept='image/*' onChange={imgHandler} multiple className='cursor-pointer z-20 h-[5vh] border-none m-0 text-[1vmax] font-normal font-[cursive] transition-all duration-200 px-[1vmax] text-black/60 bg-white' />
      </div>
      <Carousel slides={images} />
    </div>
  );
}

export default App