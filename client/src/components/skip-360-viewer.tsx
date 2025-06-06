import { useState, useRef, useCallback, useEffect } from "react";
import { ZoomIn, RotateCw, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Skip360ViewerProps {
  images: string[];
  alt: string;
  className?: string;
}

export default function Skip360Viewer({ images, alt, className = "" }: Skip360ViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Auto-rotate through images for 360-degree effect
  const autoRotate = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setRotation((prev) => prev + (360 / images.length));
  }, [images.length]);

  // Handle mouse movement for zoom positioning
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    
    // Auto-rotate based on horizontal mouse movement
    if (!isDragging) {
      const normalizedX = (e.clientX - rect.left) / rect.width;
      const imageIndex = Math.floor(normalizedX * images.length);
      setCurrentImageIndex(Math.max(0, Math.min(images.length - 1, imageIndex)));
    }
  }, [images.length, isDragging]);

  // Handle drag for manual rotation
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrag = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const sensitivity = 0.5;
    const rotationChange = deltaX * sensitivity;
    
    setRotation((prev) => prev + rotationChange);
    setDragStart({ x: e.clientX, y: e.clientY });
    
    // Change image based on rotation
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const newIndex = Math.floor((normalizedRotation / 360) * images.length);
    setCurrentImageIndex(newIndex);
  }, [isDragging, dragStart, rotation, images.length]);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setRotation((prev) => prev + (360 / images.length));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setRotation((prev) => prev - (360 / images.length));
  };

  return (
    <div className={`relative group ${className}`}>
      <div 
        ref={containerRef}
        className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setIsZoomed(false);
          setIsDragging(false);
        }}
      >
        <img
          ref={imageRef}
          src={images[currentImageIndex]}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            transform: `scale(${isZoomed ? 2 : 1}) rotate(${rotation}deg)`,
          }}
          draggable={false}
        />
        
        {/* Zoom overlay */}
        {isZoomed && (
          <div 
            className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${zoomPosition.x}% ${zoomPosition.y}%, transparent 100px, rgba(0,0,0,0.3) 150px)`
            }}
          />
        )}
        

        
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
        
        {/* Drag hint */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-xs text-white bg-black/50 px-2 py-1 rounded">
            Drag to rotate • Hover to zoom
          </div>
        </div>
      </div>
    </div>
  );
}