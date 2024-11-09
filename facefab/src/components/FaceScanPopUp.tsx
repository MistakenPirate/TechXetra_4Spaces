// components/FaceScanPopup.tsx
import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "@vladmandic/face-api";
import { X } from "lucide-react";

interface FaceScanPopupProps {
  isOpen: boolean;
  onClose: () => void;
  subjectName: string;
  onScanComplete: (success: boolean) => void;
}

const FaceScanPopup = ({
  isOpen,
  onClose,
  subjectName,
  onScanComplete,
}: FaceScanPopupProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isOpen && !modelsLoaded) {
      loadModels();
    }

    if (isOpen) {
      startVideo();
    } else {
      stopVideo();
    }

    return () => {
      stopVideo();
    };
  }, [isOpen]);

  const loadModels = async () => {
    try {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      ]);
      setModelsLoaded(true);
    } catch (err) {
      setError("Failed to load face detection models");
      console.error("Error loading models:", err);
    }
  };

  const startVideo = async () => {
    try {
      if (videoRef.current) {
        streamRef.current = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
        });
        videoRef.current.srcObject = streamRef.current;
      }
    } catch (err) {
      setError("Failed to access camera");
      console.error("Error accessing camera:", err);
    }
  };

  const stopVideo = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureAndProcess = async () => {
    if (!videoRef.current || !modelsLoaded) return;

    setIsLoading(true);
    setError("");

    try {
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceDescriptor();
      // console.log("detection is", Array.from(detection?.descriptor));
      if (!detection) {
        throw new Error(
          "No face detected. Please ensure your face is clearly visible."
        );
      }

      if (detection.detection.score < 0.02) {
        throw new Error(
          "Face detection confidence too low. Please try again in better lighting."
        );
      }

      const faceData = {
        faceDescriptor: Array.from(detection.descriptor),
      };
      console.log(faceData)

      const response = await fetch("/api/face-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          faceDescriptor: faceData,
          subjectName,
        }),
      });

      console.log(response);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process attendance");
      }

      console.log(data);

      onScanComplete(true);
      onClose();
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "Failed to process face");
      onScanComplete(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">Face Scan for {subjectName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full rounded-lg bg-black"
            style={{ maxHeight: "400px" }}
          />

          {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}

          <button
            onClick={captureAndProcess}
            disabled={isLoading || !modelsLoaded}
            className={`mt-4 w-full bg-[#39D2E6] text-white rounded-lg py-2 px-4 
              ${
                isLoading || !modelsLoaded
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#2CB5C9]"
              }
              active:scale-105 transition-transform`}
          >
            {isLoading ? "Processing..." : "Capture & Process"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaceScanPopup;
