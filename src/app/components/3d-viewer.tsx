"use client"
import {Suspense} from "react"
import {Canvas} from "@react-three/fiber"
import {OrbitControls, useGLTF, Html, useProgress} from "@react-three/drei"

const Loader = () => {
  const {progress} = useProgress()
  return <Html center className="text-white text-nowrap">Loading 3D model: {progress}% loaded...</Html>
}

const Model = (props: {src: string}) => {
  const {src} = props
  const gltf = useGLTF(src)
  return <primitive {...props} object={gltf.scene} />
}

export const Viewer3D = (props: {src: string}) => {
  const {src} = props
  return (
    <div className="flex flex-row w-full h-full">
      <Canvas
        className="cursor-pointer"
        frameloop="demand"
        camera={{fov: 0.4, near: 0.1, far: 1000, position: [0, 0, 5]}}
      >
        <OrbitControls autoRotate enableZoom={true} enableRotate={true} />
        <ambientLight intensity={0.1} />
        <Suspense fallback={<Loader />}>
          <Model src={src} />
        </Suspense>
      </Canvas>
    </div>
  )
}
