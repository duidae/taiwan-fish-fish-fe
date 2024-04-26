"use client"
import {Suspense} from "react"
import {Canvas} from "@react-three/fiber"
import {OrbitControls, useGLTF} from "@react-three/drei"

const Model = (props: any) => {
  const gltf = useGLTF("/mosquitofish_gambusia_affinis/scene.gltf")
  return <primitive {...props} object={gltf.scene} />
}

export const Viewer3D = () => {
  return (
    <div className="flex flex-row w-full h-full">
      <Canvas
        className="cursor-pointer"
        frameloop="demand"
        camera={{fov: 0.4, near: 0.1, far: 1000, position: [0, 0, 5]}}
      >
        <OrbitControls
          autoRotate
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enablePan={false}
        />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  )
}
