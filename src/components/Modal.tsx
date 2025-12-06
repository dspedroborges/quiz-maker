import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  scroll?: boolean;
  minSize?: string;
}

export function Modal({ isOpen, onClose, title, children, scroll = true, minSize }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className={`${minSize || ""} bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative max-h-[90vh] ${scroll && "overflow-y-scroll"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-black text-center">{title}</h2>
        <div className="mb-4">{children}</div>
        <button
          className="text-3xl cursor-pointer absolute top-2 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}