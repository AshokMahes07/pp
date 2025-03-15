"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Maximize, ChevronLeft, ChevronRight } from "lucide-react"; // Icons

interface Attachment {
  id: number;
  url: string;
  caption: string;
}

interface SidebarSection {
  id: number;
  name: string;
  attachments: Attachment[];
}

const sidebarData: SidebarSection[] = [
  {
    id: 57173004,
    name: "Inspection Property",
    attachments: [
      {
        id: 533995161,
        url: "https://d6a0dmw8ctfan.cloudfront.net/attachments/123056/1668165200/5104498/c2396045-6602-4e98-a626-dc078fa381c3.jpg",
        caption: "Keys At Check-In",
      },
    ],
  },
  {
    id: 57173005,
    name: "Keys At Check-In Reports",
    attachments: [
      {
        id: 533995169,
        url: "https://d6a0dmw8ctfan.cloudfront.net/attachments/123056/1668165200/5104498/cd1b4917-0597-4bb6-b8f4-b98cf86fd4fb.jpg",
        caption: "Keys At Check-In",
      },
      {
        id: 533995170,
        url: "https://www.istockphoto.com/resources/images/FreePhotos/Free-Photo-740x492-1744915333.jpg",
        caption: "Keys At Check-In",
      },
    ],
  },
  {
    id: 57173015,
    name: "Rooms At Check-In Reports",
    attachments: [
      {
        id: 533995168,
        url: "https://images.freeimages.com/images/grids/809/rooms-1456561.jpg",
        caption: "Rooms At Check-In",
      },
      {
        id: 533995172,
        url: "https://media.istockphoto.com/id/816287880/photo/cozy-bedroom.jpg?s=612x612&w=0&k=20&c=U8MNs0UQ4pM8UydmN_zZP4-IiUmJ8zy3bAFsFG5-wWM=",
        caption: "Rooms At Check-In",
      },
      {
        id: 533995173,
        url: "https://img.freepik.com/free-photo/living-room_1048-2485.jpg?semt=ais_hybrid",
        caption: "Rooms At Check-In-Test",
      },
    ],
  },
];

export default function Home() {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedSection, setSelectedSection] = useState<SidebarSection | null>(
    null
  );
  const [zoom, setZoom] = useState(1);

  const toggleSection = (id: number) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 1));
  const resetZoom = () => setZoom(1);

  const selectImage = (section: SidebarSection, index: number) => {
    setSelectedSection(section);
    setSelectedImageIndex(index);
    setZoom(1); // Reset zoom on new image selection
  };

  const prevImage = () => {
    if (selectedSection && selectedImageIndex > 0) {
      setSelectedImageIndex((prev) => prev - 1);
      setZoom(1); // Reset zoom when changing images
    }
  };

  const nextImage = () => {
    if (
      selectedSection &&
      selectedImageIndex < selectedSection.attachments.length - 1
    ) {
      setSelectedImageIndex((prev) => prev + 1);
      setZoom(1); // Reset zoom when changing images
    }
  };

  const selectedImage =
    selectedSection?.attachments[selectedImageIndex]?.url || "/property.jpg";
  const selectedSectionName = selectedSection?.name || "Select an Image";

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white fixed top-0 left-0 right-0 z-10 h-16 flex items-center px-4">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="text-center flex-1">
          200 feet radial road, Pallavaram, Chennai-600004
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 mt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto p-4">
          <div className="mb-4 pb-2">
            <img src="/property.jpg" alt="Property" />
          </div>
          {sidebarData.map((section) => (
            <div
              key={section.id}
              className="mb-4 border-b border-gray-700 pb-2"
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection(section.id)}
              >
                <p className="font-semibold flex items-center">
                  <svg
                    className={`w-4 h-4 mr-2 transform ${
                      openSection === section.id ? "rotate-90" : ""
                    } transition-transform`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                  {section.name}
                </p>
                <div className="flex items-center">
                  <span className="mr-1">{section.attachments.length}</span>
                </div>
              </div>

              {openSection === section.id && (
                <div className="mt-2">
                  {section.attachments.map((attachment, index) => (
                    <div
                      key={attachment.id}
                      className="mt-2 cursor-pointer"
                      onClick={() => selectImage(section, index)}
                    >
                      <img
                        src={attachment.url}
                        alt={attachment.caption}
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-64 p-1 flex justify-center items-center overflow-hidden relative">
          {/* Zoom Controls - Positioned at the Top Center */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex w-full grid grid-cols-3 gap-1 bg-black/30 p-0.5 rounded-md z-10">
            {/* Left Side - Zoom In/Out */}
            <div className="flex gap-1">
              <button
                onClick={zoomIn}
                className="p-1.5 bg-gray-700 text-white rounded hover:bg-gray-900 flex justify-center"
              >
                <Plus size={20} />
              </button>
              <button
                onClick={zoomOut}
                className="p-1.5 bg-gray-700 text-white rounded hover:bg-gray-900 flex justify-center"
              >
                <Minus size={20} />
              </button>
            </div>

            {/* Center - Display Selected Section Name */}
            <div className="flex items-center justify-center text-white-900 font-semibold text-sm">
              {selectedSectionName}
            </div>

            {/* Right Side - Static Icon */}
            <div className="flex justify-end">
              <button
                className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-800 flex justify-center"
                onClick={() => {
                  if (selectedImage) {
                    window.open(selectedImage, "_blank");
                  }
                }}
              >
                <Maximize size={20} />
              </button>
            </div>
          </div>

          {/* Image Display (Fixed Position & Zoomable) */}
          <div className="w-full h-full max-w-screen-lg flex justify-center items-center">
            {/* Wrapper div to avoid blocking clicks */}
            <div
              className="relative flex justify-center items-center overflow-auto w-full h-full pointer-events-none"
              style={{ width: "100%", height: "100%" }}
            >
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-auto max-h-[87vh] object-contain rounded cursor-pointer transition-transform duration-300"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>

            {/* Previous Button (Left) */}
            {selectedSection && selectedSection.attachments.length > 1 && (
              <button
                onClick={prevImage}
                disabled={selectedImageIndex === 0}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 disabled:opacity-50 pointer-events-auto"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Next Button (Right) */}
            {selectedSection && selectedSection.attachments.length > 1 && (
              <button
                onClick={nextImage}
                disabled={
                  selectedImageIndex === selectedSection.attachments.length - 1
                }
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 disabled:opacity-50 pointer-events-auto"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
