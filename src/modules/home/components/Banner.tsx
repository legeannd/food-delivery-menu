import Image, { ImageProps } from "next/image";

export const Banner = (props: ImageProps) => {
  return (
    <div className="relative flex w-full h-auto border-t border-t-white">
      <Image
        {...props}
        src={props.src}
        alt={props.alt}
        width={600}
        height={400}
      />
    </div>
  );
};
