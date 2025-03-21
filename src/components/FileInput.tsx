import { useState, useRef, useEffect } from 'react';
import RequiredLabel from './RequiredLabel';
import ErrorMessage from './ErrorMessage';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { FileInputProps } from '../types/components';

export default function FileInput({ 
  label, 
  onChange, 
  error, 
  value 
}: FileInputProps) {
  const [fileName, setFileName] = useState('');
  const [isRestoredFromSession, setIsRestoredFromSession] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputId = `file-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${inputId}-error`;

  useEffect(() => {
    const savedFormData = sessionStorage.getItem('workout-form-data');
    if (savedFormData && value) {
      setIsRestoredFromSession(true);
      setFileName(value.name);

      setTimeout(() => {
        setIsRestoredFromSession(false);
      }, 2000);
    }
  }, [value]);

  const handleDroppedFiles = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      onChange(file);
    }
  };

  const {
    isDragging,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop
  } = useDragAndDrop({
    onDrop: handleDroppedFiles
  });

  useEffect(() => {
    if (value === null && fileName !== '') {
      setFileName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [value, fileName]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      onChange(file);
    } else {
      setFileName('');
      onChange(null);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileName('');
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
    if (e.key === "Delete" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      setFileName("");
      onChange(null);
    }
  };

  return (
    <div className="space-y-1">
      <RequiredLabel text={label} required={error ? true : false} forId={inputId} />

        <div
          className={`ring-1 ${
            error ? "ring-error" : isDragging ? "ring-primary ring-2" : isRestoredFromSession ? "ring-green-500 ring-2" : "ring-inactive"
          } rounded-lg p-10 flex justify-center group gap-2 items-center text-center cursor-pointer bg-white hover:ring-primary transition-all duration-300 ${
            isDragging ? "bg-gray-50" : isRestoredFromSession ? "bg-green-50" : ""
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          title="Upload a image file"
          data-restored={isRestoredFromSession ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          aria-label={fileName ? `Selected file: ${fileName}. Press Enter to change, or Delete to remove.` : "Upload a photo. Press Enter to browse files."}
        >
          {fileName ? (
            <>
              <span className="text-base truncate max-w-[150px]">{fileName}</span>
              <button
                type="button"
                onClick={handleDelete}
                className="hover:text-error "
                aria-label="Remove selected file"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  className="fill-foreground group-hover:fill-error cursor-pointer transition-colors duration-300"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0ZM7.879 6.464C7.69946 6.28275 7.45743 6.17697 7.20245 6.16832C6.94748 6.15967 6.69883 6.2488 6.50742 6.41747C6.31601 6.58613 6.1963 6.82159 6.1728 7.07562C6.14929 7.32966 6.22378 7.58308 6.381 7.784L6.465 7.879L8.585 9.999L6.465 12.121C6.28375 12.3005 6.17797 12.5426 6.16932 12.7975C6.16067 13.0525 6.2498 13.3012 6.41847 13.4926C6.58713 13.684 6.82258 13.8037 7.07662 13.8272C7.33066 13.8507 7.58408 13.7762 7.785 13.619L7.879 13.536L10 11.414L12.121 13.536C12.3005 13.7173 12.5426 13.823 12.7975 13.8317C13.0525 13.8403 13.3012 13.7512 13.4926 13.5825C13.684 13.4139 13.8037 13.1784 13.8272 12.9244C13.8507 12.6703 13.7762 12.4169 13.619 12.216L13.536 12.121L11.414 10L13.536 7.879C13.7173 7.69946 13.823 7.45743 13.8317 7.20245C13.8403 6.94748 13.7512 6.69883 13.5825 6.50742C13.4139 6.31601 13.1784 6.1963 12.9244 6.1728C12.6703 6.14929 12.4169 6.22378 12.216 6.381L12.121 6.464L10 8.586L7.879 6.464Z" />
                </svg>
              </button>
            </>
          ) : (
            <>
              <span className="block text-sm text-primary underline underline-offset-2">
                Upload a file
              </span>
              <span className={`hidden lg:inline-block text-xs text-muted ${isDragging ? "font-semibold" : ""}`}>
                or drag and drop here
              </span>
            </>
          )}
        </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        id={inputId}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
      />

      <ErrorMessage error={error} id={errorId} />
    </div>
  );
}
