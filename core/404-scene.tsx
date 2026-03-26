import { Suspense, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Environment,
  RenderTexture,
  Text,
  PerspectiveCamera,
} from "@react-three/drei";
import { LayerMaterial, Displace } from "lamina";

const LINE_1 = "Page not found";
const LINE_2 = "404";

export default function Scene() {
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <PerspectiveCamera position={[0, 0, 50]} makeDefault />
      <Suspense fallback={null}>
        <Bubble />
        <Typography />
        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  );
}

function Bubble() {
  const displaceRef = useRef<any>(null);
  const { width } = useThree((state) => state.viewport);

  useFrame((_, dt) => {
    if (displaceRef.current) {
      displaceRef.current.offset.x += 4 * dt;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[width / 8, 128, 128]} />
      <LayerMaterial
        color={"white"}
        lighting={"physical"}
        transmission={1}
        roughness={0}
        thickness={2}
        toneMapped={false}
      >
        <Displace ref={displaceRef} strength={3} scale={0.25} />
      </LayerMaterial>
    </mesh>
  );
}

function Typography() {
  const { width, height } = useThree((state) => state.viewport);
  const vw = (size: number) => (width * size) / 100;
  const vh = (size: number) => (height * size) / 100;

  return (
    <mesh>
      <planeGeometry args={[width, height, 1]} />
      <meshBasicMaterial toneMapped={false}>
        <RenderTexture attach="map">
          <color attach="background" args={["hsl(0,0%,03%)"]} />
          <Text fontSize={vw(2)} position={[0, vh(10), 0]}>
            {LINE_1}
          </Text>
          <Text
            fontWeight={500}
            fontSize={vw(14)}
            position={[0, 0, 0]}
          >
            {LINE_2}
          </Text>
        </RenderTexture>
      </meshBasicMaterial>
    </mesh>
  );
}
