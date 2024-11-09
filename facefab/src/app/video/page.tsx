'use client'

import { useEffect, useRef, useState } from 'react'
import * as faceapi from '@vladmandic/face-api' 
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function FaceEnrollment() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { user, isLoaded, isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/')
    }
  }, [isLoaded, isSignedIn, router])

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'
      
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ])
        setModelsLoaded(true)
      } catch (error) {
        console.error('Error loading models:', error)
      }
    }

    loadModels()
  }, [])

  useEffect(() => {
    const startVideo = async () => {
      if (!modelsLoaded || !videoRef.current) return

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: 640,
            height: 480,
            facingMode: 'user',
            frameRate: { ideal: 30 }
          } 
        })
        videoRef.current.srcObject = stream
      } catch (error) {
        console.error('Error accessing webcam:', error)
      }
    }

    startVideo()

    const current = videoRef.current
    return () => {
      if (current?.srcObject) {
        console.log("Clear Video")
        const tracks = (current.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      } 
    }
  }, [modelsLoaded])

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current || !modelsLoaded) return

    let animationFrameId: number

    const detectFaces = async () => {
      console.log("inside detectFaces")
      if (!videoRef.current || !canvasRef.current) return

      const video = videoRef.current
      const canvas = canvasRef.current
      const displaySize = { width: video.width, height: video.height }
      faceapi.matchDimensions(canvas, displaySize)

      const detect = async () => {
        try {
          console.log("rter")
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.SsdMobilenetv1Options({
              minConfidence: 0.5,
              maxResults: 1 
            }))
            .withFaceLandmarks()

          const resizedDetections = faceapi.resizeResults(detections, displaySize)
          
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            
            faceapi.draw.drawDetections(canvas, resizedDetections)
            
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)

            resizedDetections.forEach(detection => {
              const { box } = detection.detection
              const drawBox = new faceapi.draw.DrawBox(box, {
                label: `Confidence: ${Math.round(detection.detection.score * 100)}%`
              })
              drawBox.draw(canvas)
            })
          }
        } catch (error) {
          console.error('Error in face detection:', error)
        }
        
        animationFrameId = requestAnimationFrame(detect)
      }

      detect()
    }

    detectFaces()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [modelsLoaded])


  const enrollFace = async () => {
    if (!videoRef.current || isProcessing) return
    console.log("sdfsfs")
    setIsProcessing(true)
    try {
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.SsdMobilenetv1Options({
          minConfidence: 0.7 
        }))
        .withFaceLandmarks()
        .withFaceDescriptor()

      console.log('enrollFace')

      if (!detection) {
        alert('No face detected! Please ensure your face is clearly visible and well-lit.')
        setIsProcessing(false)
        return
      }

      const faceData = {
        faceDescriptor: Array.from(detection.descriptor)
      }

      const response = await fetch('../api/face-enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faceData),
      })
      
      console.log(response)

      if (response.ok) {
        console.log("ok")
        alert('Face enrolled successfully!')
        router.push('/dashboard')
      } else {
        const error = await response.json()
        alert(`Error enrolling face: ${error.message}`)
      }
    } catch (error) {
      console.log(error)
      console.error('Error during face enrollment:', error)
      alert('Error during face enrollment. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Face Enrollment for {user?.firstName}
        </h1>
        
        <div className="relative mb-6">
          <video
            ref={videoRef}
            autoPlay
            muted
            width="640"
            height="480"
            className="rounded-lg border border-gray-200"
          />
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            className="absolute top-0 left-0"
          />
          {!modelsLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
              Loading face detection models...
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={enrollFace}
            disabled={isProcessing || !modelsLoaded}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     disabled:bg-gray-400 disabled:cursor-not-allowed
                     transition duration-200 w-48"
          >
            {isProcessing ? 'Processing...' : 'Enroll Face'}
          </button>

          <div className="text-sm text-gray-600 space-y-2">
            <p>✓ Face should be well-lit and clearly visible</p>
            <p>✓ Look directly at the camera</p>
            <p>✓ Keep a neutral expression</p>
            <p>✓ Avoid wearing glasses if possible</p>
          </div>
        </div>
      </div>
    </div>
  )
}