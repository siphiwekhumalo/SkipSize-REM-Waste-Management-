import { useState, useCallback } from "react";

interface Skip360ViewerProps {
  images: string[];
  alt: string;
  className?: string;
}

export default function Skip360Viewer({ images, alt, className = "" }: Skip360ViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    
    // Switch images based on horizontal position
    const normalizedX = (e.clientX - rect.left) / rect.width;
    const imageIndex = Math.floor(normalizedX * images.length);
    setCurrentImageIndex(Math.max(0, Math.min(images.length - 1, imageIndex)));
  }, [images.length]);

  return (
    <div className={`relative group w-full h-full ${className}`}>
      <div 
        className="relative w-full h-full overflow-hidden bg-gray-800 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <img
          src={images[currentImageIndex]}
          alt={alt}
          className="w-full h-full object-contain transition-all duration-300"
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            transform: `scale(${isZoomed ? 1.5 : 1})`,
          }}
          draggable={false}
        />
        
        {/* Navigation dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}