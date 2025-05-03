"use client"

import { apiClient } from '@/app/utils/api-client'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const ImageUploader = ({ value, onChange }: { value: string, onChange: (url: string) => void }) => {

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    console.log("value", value);

    try {
      // Step 1: Get presigned URL from backend
      const res = await apiClient.post('/presigned-url', {
        fileName: file.name,
        contentType: file.type,
      })

      const uploadUrl = res.data.url

      // Step 2: Upload file to S3
      await axios.put(uploadUrl, file, {
        headers: { 'Content-Type': file.type },
      })

      // Step 3: Extract public URL (remove query string)
      const publicUrl = uploadUrl.split('?')[0]
      onChange(publicUrl)
    } catch (error) {
      console.error("Upload failed", error)
    }
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  })

  return (
    <div>
      <div
        {...getRootProps()}
        className="border border-dashed p-4 rounded-md text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : (
          <p>Click or drag an image file to upload</p>
        )}
      </div>
    </div>
  )
}

export default ImageUploader
