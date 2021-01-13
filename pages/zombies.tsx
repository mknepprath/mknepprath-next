export default function Zombies(): React.ReactNode {
  return (
    <object
      type="application/x-shockwave-flash"
      data="/assets/zombies.swf"
      width="800"
      height="600"
    >
      <param name="movie" value="/assets/zombies.swf" />
      <param name="quality" value="high" />
    </object>
  );
}
