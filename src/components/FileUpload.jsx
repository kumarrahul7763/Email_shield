import { useState, useRef, useEffect } from 'react';
import { uploadCSV, checkHealth } from '../services/api';

/**
 * FileUpload Component
 * Allows users to upload CSV files for bulk email classification
 */
const FileUpload = ({ onResults, onError }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [backendStatus, setBackendStatus] = useState({ checked: false, running: false });
  const fileInputRef = useRef(null);

  // Check backend health on component mount
  useEffect(() => {
    const checkBackend = async () => {
      const health = await checkHealth();
      setBackendStatus({
        checked: true,
        running: health.success
      });
    };
    checkBackend();
  }, []);

  /**
   * Handle file selection
   */
  const handleFileSelect = async (file) => {
    if (!file) return;

    // Check backend status before uploading
    if (!backendStatus.running) {
      onError?.('Backend server is not running. Please start the backend server first.');
      return;
    }

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      onError?.('Please upload a CSV file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      onError?.('File size must be less than 5MB');
      return;
    }

    setFileName(file.name);
    setIsLoading(true);

    try {
      const results = await uploadCSV(file);
      onResults?.(results.data);
    } catch (error) {
      onError?.(error.message);
    } finally {
      setIsLoading(false);
      setFileName('');
    }
  };

  /**
   * Handle drag events
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  /**
   * Handle file input change
   */
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  /**
   * Trigger file input click
   */
  const handleClick = () => {
    if (!backendStatus.running) {
      onError?.('Backend server is not running. Please start the backend server first.');
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="card-gradient animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-lg opacity-30"></div>
          <div className="relative p-3 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-200">Bulk Email Upload</h2>
          <p className="text-gray-400 mt-1">Upload a CSV file to classify multiple emails at once</p>
        </div>
        
        {/* Backend Status Indicator */}
        {backendStatus.checked && !backendStatus.running && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Backend Offline
          </div>
        )}
      </div>

      {/* Drop zone */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 overflow-hidden
          ${isDragging 
            ? 'border-purple-500 bg-gradient-to-br from-purple-500/10 to-pink-500/10 scale-[1.02]' 
            : 'border-white/20 hover:border-purple-500/50 hover:bg-gradient-to-br hover:from-purple-500/5 hover:to-pink-500/5'
          }
          ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}
          ${!backendStatus.running ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleInputChange}
          className="hidden"
          disabled={isLoading || !backendStatus.running}
        />

        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl opacity-50"></div>
        </div>

        {isLoading ? (
          <div className="relative z-10 space-y-4">
            <div className="w-16 h-16 mx-auto spinner"></div>
            <div>
              <p className="text-lg font-semibold text-gray-300">Processing {fileName}...</p>
              <p className="text-sm text-gray-400 mt-1">Please wait while we classify your emails</p>
            </div>
          </div>
        ) : (
          <div className="relative z-10 space-y-4">
            <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center transition-all duration-300 ${isDragging ? 'bg-purple-500/20 scale-110' : 'bg-white/5'}`}>
              <svg className={`w-10 h-10 transition-colors duration-300 ${isDragging ? 'text-purple-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-300">
                {!backendStatus.running 
                  ? 'Backend server is not running' 
                  : isDragging 
                    ? 'Drop your CSV file here' 
                    : 'Drag & drop your CSV file here'
                }
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {!backendStatus.running 
                  ? 'Please start the backend server first' 
                  : 'or click to browse files'
                }
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xs text-gray-400">Supports CSV files up to 5MB</span>
            </div>
          </div>
        )}
      </div>

      {/* CSV format info */}
      <div className="mt-6 p-5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
        <h3 className="text-sm font-bold text-blue-300 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          CSV Format
        </h3>
        <p className="text-sm text-blue-200 mb-3">
          Your CSV should have a column named <code className="px-2 py-0.5 bg-blue-500/20 rounded font-mono text-xs text-blue-300">text</code>, <code className="px-2 py-0.5 bg-blue-500/20 rounded font-mono text-xs text-blue-300">email</code>, <code className="px-2 py-0.5 bg-blue-500/20 rounded font-mono text-xs text-blue-300">content</code>, or <code className="px-2 py-0.5 bg-blue-500/20 rounded font-mono text-xs text-blue-300">body</code>
        </p>
        <div className="text-xs text-blue-300 font-mono bg-white/5 p-3 rounded-xl border border-blue-500/20">
          id,text,subject<br />
          1,"Urgent: Please review the invoice","Invoice Review"
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
