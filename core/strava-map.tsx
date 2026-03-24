import { useEffect, useRef, useState } from "react";

import styles from "./strava-map.module.css";

/**
 * Decode a Google-encoded polyline string into an array of [lat, lng] pairs.
 * https://developers.google.com/maps/documentation/utilities/polylinealgorithm
 */
function decodePolyline(encoded: string): [number, number][] {
  const points: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte: number;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    lat += result & 1 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    lng += result & 1 ? ~(result >> 1) : result >> 1;

    points.push([lat / 1e5, lng / 1e5]);
  }

  return points;
}

interface StravaMapProps {
  polyline: string;
}

const PADDING = 10;
const WIDTH = 200;

const StravaMap = ({ polyline }: StravaMapProps) => {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [polyline]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const points = decodePolyline(polyline);

  if (points.length < 2) return null;

  const lats = points.map((p) => p[0]);
  const lngs = points.map((p) => p[1]);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const latRange = maxLat - minLat || 0.001;
  const lngRange = maxLng - minLng || 0.001;

  const aspectRatio = latRange / lngRange;
  const height = Math.round(WIDTH * aspectRatio);

  const innerWidth = WIDTH - PADDING * 2;
  const innerHeight = height - PADDING * 2;

  const svgPoints = points.map((p) => {
    const x = PADDING + ((p[1] - minLng) / lngRange) * innerWidth;
    const y = PADDING + ((maxLat - p[0]) / latRange) * innerHeight;
    return `${x},${y}`;
  });

  const d = `M${svgPoints.join("L")}`;

  return (
    <div className={styles.container} ref={containerRef}>
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={pathRef}
          className={styles.route}
          d={d}
          style={
            pathLength && visible
              ? ({
                  strokeDasharray: pathLength,
                  "--path-length": pathLength,
                } as React.CSSProperties)
              : { opacity: 0 }
          }
        />
      </svg>
    </div>
  );
};

export default StravaMap;
