/* A small isometric block in the industry's color. Replaces pictogram icons
   (hard hats, trucks) so industry chips read as part of the 3D system. */
export default function IndGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg className="ind-glyph" width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 1.8 17.6 6 10 10.2 2.4 6Z" fill="currentColor" opacity="0.55" />
      <path d="M2.4 6 10 10.2V18.4L2.4 14.2Z" fill="currentColor" />
      <path d="M17.6 6 10 10.2V18.4L17.6 14.2Z" fill="currentColor" opacity="0.78" />
    </svg>
  );
}
